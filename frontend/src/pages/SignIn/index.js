import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { schema } from './validationSchema';

import { StyledForm } from './styles';

export default function SignIn({ test }) {
  return (
    <StyledForm schema={schema} onSubmit={() => {}}>
      <h1>Sign in</h1>

      <Input type="email" name="email" label="email: " />
      <Input type="password" name="password" label="password: " />

      <h1>{test}</h1>

      <button type="submit">Sign In</button>
    </StyledForm>
  );
}
