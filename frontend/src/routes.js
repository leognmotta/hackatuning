import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { IsLogged, PrivateRoute } from './utils/AuthComponents';

import Home from './pages/Home';

export default function Routes() {
  return (
    <Switch>
      <IsLogged path="/" exact component={Home} />
    </Switch>
  );
}
