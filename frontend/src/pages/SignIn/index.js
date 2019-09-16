import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { signInRequest } from '../../store/modules/auth/actions';

import { StyledForm } from './styles';

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
    <StyledForm schema={schema} onSubmit={handleSubmit}>
      <h1>Sign in</h1>

      <Input type="email" name="email" label="email: " />
      <Input type="password" name="password" label="password: " />

      <button type="submit">{ loading ? 'Loading...' : 'Sign In' }</button>
      <Link to="/register">Register NOW!</Link>
    </StyledForm>
  );
}
