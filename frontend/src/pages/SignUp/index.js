import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Form, Input, Select, H1 } from './styles';

export default function SignUp() {
  const dispatch = useDispatch();
  // roles will come from database in useEffect.
  const roles = [
    { id: 'Frontend', title: 'Frontend' },
    { id: 'Backend', title: 'Backend' },
    { id: 'Fullstack', title: 'Fullstack' },
    { id: 'Management', title: 'Management' },
    { id: 'Busines', title: 'Busines' },
    { id: 'Marketing', title: 'Marketing' },
    { id: 'UX/UI', title: 'UX/UI' },
  ];

  function handleSubmit({ name, email, nickname, password, bio, urls, role }) {
    dispatch();
  }

  return (
    <Container>
      <H1> Register </H1>
      <Form onSubmit={handleSubmit}>
        <Input name="name" placeholder=" Your name here!" />
        <Input name="nickname" placeholder=" Nickname (not pussySlayer69)" />
        <Input name="email" type="email" placeholder=" E-Mail here!" err />
        <Input
          name="password"
          type="password"
          placeholder=" Super secret pass plss"
        />
        <Input
          name="bio"
          maxLength="255"
          placeholder=" Tell me about you! I want to know..."
          multiline
        />

        <Input name="urls" placeholder=" Some useful links here" />

        <Select name="role" options={roles} />
        <Select name="role2" options={roles} />
        <Select name="role3" options={roles} />

        <button type="submit">Send</button>
        <Link to="/login">Have an account? Make a login!</Link>
      </Form>
    </Container>
  );
}
