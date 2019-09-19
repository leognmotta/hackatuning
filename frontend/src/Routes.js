import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { IsLogged, PrivateRoute } from './utils/customRoutes';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Settings from './pages/Settings';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <IsLogged path="/login" component={SignIn} />
    <IsLogged path="/register" component={SignUp} />
    <PrivateRoute path="/settings" component={Settings} />
    <Route path="/internal-error" render={() => <h1>Internal error</h1>} />
    <Route path="*" render={() => <h1>Not found</h1>} />
  </Switch>
);

export default Routes;
