import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { IsLogged, PrivateRoute } from './utils/customRoutes';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Settings from './pages/Settings';
import Details from './pages/Details';
import RegisterHackathon from './pages/RegisterHackathon';
import Hackathons from './pages/Hackathons';
import UpdateHackathon from './pages/UpdateHackathon';
import HackathonEvent from './pages/HackathonEvent';
import ManageTeam from './pages/ManageTeam';
import Profile from './pages/Profile';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <IsLogged path="/login" component={SignIn} />
    <IsLogged path="/register" component={SignUp} />
    <PrivateRoute path="/settings" component={Settings} />

    <Route path="/profile/:nickname" component={Profile} />

    <PrivateRoute path="/hackathons" component={Hackathons} />
    <PrivateRoute path="/hackathon/:id" exact component={HackathonEvent} />
    <Route path="/hackathon/:id/details" component={Details} />
    <PrivateRoute path="/hackathon/:id/edit" component={UpdateHackathon} />
    <PrivateRoute path="/hackathon/:id/manage" component={ManageTeam} />
    <PrivateRoute path="/register-hackathon" component={RegisterHackathon} />

    <Route path="/internal-error" render={() => <h1>Internal error</h1>} />
    <Route path="*" render={() => <h1>Not found</h1>} />
  </Switch>
);

export default Routes;
