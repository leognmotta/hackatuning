import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from './auth';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);

export const IsLogged = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);
