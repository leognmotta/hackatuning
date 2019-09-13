import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { schema } from './validationSchema';
import { Link } from 'react-router-dom';

import { signInRequest } from '../../store/modules/auth/actions';

import { StyledForm } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <StyledForm schema={schema} onSubmit={handleSubmit}>
      <h1>Sign in</h1>

      <Input type="email" name="email" label="email: " />
      <Input type="password" name="password" label="password: " />

      <button type="submit">Sign In</button>
      <Link to="/register">Register NOW!</Link>
    </StyledForm>
  );
}
