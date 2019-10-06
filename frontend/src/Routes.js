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
import Invitations from './pages/Invitations';
import Teams from './pages/Teams';
import SeeAllTeams from './pages/SeeAllTeams';
import Claendly from './pages/Calendly';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <IsLogged path="/app/login" component={SignIn} />
    <IsLogged path="/app/register" component={SignUp} />
    <PrivateRoute path="/app/settings" component={Settings} />

    <PrivateRoute path="/app/teams" component={Teams} />

    <Route exact path="/:nickname" component={Profile} />

    <PrivateRoute path="/app/invitations" component={Invitations} />

    <PrivateRoute path="/app/hackathons" component={Hackathons} />
    <PrivateRoute path="/app/hackathon/:id" exact component={HackathonEvent} />
    <PrivateRoute path="/app/hackathon/:id/teams" component={SeeAllTeams} />
    <Route path="/app/hackathon/:id/details" component={Details} />
    <PrivateRoute path="/app/hackathon/:id/edit" component={UpdateHackathon} />
    <PrivateRoute
      path="/app/hackathon/team/:id/manage"
      component={ManageTeam}
    />
    <PrivateRoute
      path="/app/register-hackathon"
      component={RegisterHackathon}
    />

    <PrivateRoute path="/app/calendly" component={Claendly} />

    <Route path="/app/internal-error" render={() => <h1>Internal error</h1>} />
    <Route path="*" render={() => <h1>Not found</h1>} />
  </Switch>
);

export default Routes;
