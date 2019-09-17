import { Router } from 'express';

import filesRoute from './filesRoute';
import usersRoute from './usersRoute';
import rolesRoute from './rolesRoute';
import sessionsRoute from './sessionsRoute';
import hackathonsRoute from './hackathonsRoutes';
import participantsRoutes from './participantsRoutes';

const routes = Router();

routes.use(filesRoute);

routes.use(usersRoute);

routes.use(rolesRoute);

routes.use(sessionsRoute);

routes.use(hackathonsRoute);

routes.use(participantsRoutes);

export default routes;
