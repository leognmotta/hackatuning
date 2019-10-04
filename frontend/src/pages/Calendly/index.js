import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import api from '../../services/api';

import { Input, Form, Button } from '../../components/Form';
import { Container } from './styles';

const mapStateToProps = state => ({
  user: state.auth,
});

export default connect(mapStateToProps)(function Calendly({ user, history }) {
  const [calendly, setCalendly] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const { data } = await api.get(`/v1/users/${user.id}`);

      if (data.is_mentor && data.is_mentor === false) history.push('/');
    }

    loadUser();
  }, [user.id, history]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.put(`/v1/users`, {
        calendly,
      });

      toast('Calendly url updated!', {
        className: 'toast-background-success',
        bodyClassName: 'toast-font-size',
        progressClassName: 'toast-progress-bar-success',
        autoClose: 1500,
      });

      setTimeout(() => {
        history.push('/');
      }, 1500);
    } catch (error) {
      setIsLoading(false);

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
    <Container onSubmit={handleSubmit}>
      <h1>You are now a mentor!</h1>
      <small>
        Please add your calendly url, if you are not sure what it is, here is
        how you can get yours: <a href="https://calendly.com/">Calendly.</a>
      </small>

      <Form>
        <Input
          label="Calendly url:"
          onChange={e => setCalendly(e.target.value)}
          value={calendly}
        />

        <Button loading={isLoading ? 1 : 0} text="Send" />
      </Form>

      <ToastContainer />
    </Container>
  );
});
