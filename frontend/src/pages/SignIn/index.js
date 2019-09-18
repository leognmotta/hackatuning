import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../services/api';
import { login } from '../../utils/auth';
import { reduxLogin } from '../../store/ducks/auth';

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
          ? error.response.data.fields[0]
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
        <h1>Sign in</h1>

        <Input
          type="email"
          name="email"
          placeholder="Your E-Mail here"
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          placeholder="A super secret pass here!"
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Sign in</button>
        <span className="or">OR</span>
        <Link to="/register">Register NOW!</Link>
      </StyledForm>

      <ToastContainer />
    </Container>
  );
}
