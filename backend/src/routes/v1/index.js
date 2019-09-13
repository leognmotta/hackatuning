import { Router } from 'express';

import filesRoute from './filesRoute';
import usersRoute from './usersRoute';
import rolesRoute from './rolesRoute';
import sessionsRoute from './sessionsRoute';
import HackathonsRoute from './hackathonsRoutes';
import ParticipantRoute from './ParticipantRoutes';

const routes = Router();

routes.use(filesRoute);

routes.use(usersRoute);

routes.use(rolesRoute);

routes.use(sessionsRoute);

routes.use(HackathonsRoute);

routes.use(ParticipantRoute);

export default routes;
