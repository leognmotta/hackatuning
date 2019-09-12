import { Router } from 'express';

import filesRoute from './filesRoute';
import usersRoute from './usersRoute';
import rolesRoute from './rolesRoute';
import sessionsRoute from './sessionsRoute';

const routes = Router();

routes.use(filesRoute);

routes.use(usersRoute);

routes.use(rolesRoute);

routes.use(sessionsRoute);

export default routes;
