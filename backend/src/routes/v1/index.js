import { Router } from 'express';

import filesRoute from './filesRoute';
import usersRoute from './usersRoute';
import rolesRoute from './rolesRoute';
import sessionsRoute from './sessionsRoute';
import hackathonsRoute from './hackathonsRoute';
import participantsRoute from './participantsRoute';
import notificationsRoute from './notificationsRoute';
import validateTokensRoute from './validateTokensRoute';

const routes = Router();

routes.use(filesRoute);

routes.use(usersRoute);

routes.use(rolesRoute);

routes.use(sessionsRoute);

routes.use(hackathonsRoute);

routes.use(participantsRoute);

routes.use(notificationsRoute);

routes.use(validateTokensRoute);

export default routes;
