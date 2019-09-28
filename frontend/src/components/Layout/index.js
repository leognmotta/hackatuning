import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '../../services/api';
import { reduxLogin, reduxLogout } from '../../store/modules/auth/actions';
import { logout } from '../../utils/auth';

import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function persistAuthState() {
      try {
        const { data } = await api.get('/v1/validate');

        dispatch(reduxLogin({ id: data.id, name: data.name, isAuth: true }));
      } catch (error) {
        logout();
        dispatch(reduxLogout());
      }
    }

    persistAuthState();
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
