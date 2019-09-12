import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';

import { StyledForm } from './styles';

export default function SignIn({ test }) {
  return (
    <StyledForm onSubmit={() => {}}>
      <h1>Sign in</h1>

      <Input name="email" label="email: " type="email" />
      <Input name="password" label="password: " type="password" />

      <h1>{test}</h1>

      <button type="submit">Sign In</button>
    </StyledForm>
  );
}
