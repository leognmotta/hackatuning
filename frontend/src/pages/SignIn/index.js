import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../services/api';
import { login } from '../../utils/auth';
import { reduxLogin } from '../../store/modules/auth/actions';

import LogoIcon from '../../assets/Logo@icon.svg';
import { Container } from './styles';
import { Form, Button, Input } from '../../components/Form';

export default function SignIn({ history }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await api.post('/v1/sessions', {
        email,
        password,
      });

      login(data.token);

      dispatch(
        reduxLogin({
          id: data.user.id,
          isAuth: true,
          name: data.user.name,
        })
      );

      history.push('/');
    } catch (error) {
      let errMsg;

      if (error.response.status === 429) {
        errMsg = 'You have exceeded the retry limit, please try again later';
      } else if (error.response.data.fields) {
        errMsg = error.response.data.fields[0].message;
      } else {
        errMsg = error.response.data.message;
      }

      toast(errMsg, {
        className: 'toast-background',
        bodyClassName: 'toast-font-size',
        progressClassName: 'toast-progress-bar',
      });
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <img src={LogoIcon} alt="logo" style={{ marginBottom: 20 }} />
        <h1>Sign in</h1>
        <small>Please, provide your email and password</small>

        <Input
          label="Email:"
          type="email"
          placeholder="me@mail.com"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />

        <Input
          label="Password:"
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="***"
          value={password}
        />

        <Button type="submit" text="Sign in" />

        <Link className="link" to="/app/register">
          Register now!
        </Link>
      </Form>

      <ToastContainer />
    </Container>
  );
}
