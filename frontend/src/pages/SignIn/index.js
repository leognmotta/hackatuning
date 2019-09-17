import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { signInRequest } from '../../store/modules/auth/actions';

import { StyledForm, Container, Input } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insert a valid E-Mail')
    .required('E-Mail is required'),
  password: Yup.string().required('Password is required'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <StyledForm schema={schema} onSubmit={handleSubmit}>
        <h1>Sign in</h1>

        <Input type="email" name="email" placeholder="Your E-Mail here" />
        <Input type="password" name="password" placeholder="A super secret pass here!" />

        <button type="submit">{ loading ? 'Loading...' : 'Sign In' }</button>
        <Link to="/register">Register NOW!</Link>
      </StyledForm>
    </Container>
  );
}
