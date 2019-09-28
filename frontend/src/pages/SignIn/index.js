import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../services/api';
import { login } from '../../utils/auth';
import { reduxLogin } from '../../store/modules/auth/actions';

import LogoIcon from '../../assets/Logo@icon.svg';
import { StyledForm, Container, Input } from './styles';

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
      toast(
        error.response.data.fields
          ? error.response.data.fields[0].message
          : error.response.data.message,
        {
          className: 'toast-background',
          bodyClassName: 'toast-font-size',
          progressClassName: 'toast-progress-bar',
        }
      );
    }
  }

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <img src={LogoIcon} alt="logo" style={{ marginBottom: 20 }} />
        <h1>Sign in</h1>
        <small>Please, provide your email and password</small>

        <label htmlFor="email" className="label">
          {' '}
          Email:
        </label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Your E-Mail here"
          onChange={e => setEmail(e.target.value)}
        />

        <label htmlFor="password" className="label">
          {' '}
          Passoword:
        </label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="A super secret pass here!"
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Sign in</button>
        <Link className="link" to="/register">
          Register now!
        </Link>
      </StyledForm>

      <ToastContainer />
    </Container>
  );
}
