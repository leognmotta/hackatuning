import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../utils/auth';

import AuthLayout from '../components/Layout/auth';
import DefaultLayout from '../components/Layout/default';

import { store } from '../store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const signed = isAuthenticated();

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/home" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => <Layout childComponent={Component} {...props} />}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
