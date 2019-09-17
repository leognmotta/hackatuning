import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import api from '../../services/api';
import { reduxLogin, reduxLogout } from '../../store/ducks/auth';
import { logout } from '../../utils/auth';

import Header from './Header';
import Footer from './Footer';

export default withRouter(function Layout({ children, history }) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function persistAuthState() {
      try {
        const { data } = await api.get('/v1/validate');

        dispatch(reduxLogin({ id: data.id, name: data.name, isAuth: true }));
      } catch (error) {
        logout();
        dispatch(reduxLogout());
        history.push('/login');
      }
    }

    persistAuthState();
  }, [dispatch, history]);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
});
