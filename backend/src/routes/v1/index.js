import { Router } from 'express';

import filesRoute from './filesRoute';
import usersRoute from './usersRoute';
import rolesRoute from './rolesRoute';
import sessionsRoute from './sessionsRoute';
<<<<<<< HEAD
import hackathonsRoute from './hackathonsRoutes';
import participantsRoutes from './participantsRoutes';
=======
import HackathonsRoute from './hackathonsRoutes';
import ParticipantRoute from './ParticipantRoutes';
import NotificationRoute from './NotificationRoutes';
import ValidateTokenRoute from './ValidateTokenRoute';
>>>>>>> 51ae68bd44f4f6ada2c787b701e0cf6fd659bcc1

const routes = Router();

routes.use(filesRoute);

routes.use(usersRoute);

routes.use(rolesRoute);

routes.use(sessionsRoute);

<<<<<<< HEAD
routes.use(hackathonsRoute);
=======
routes.use(NotificationRoute);

routes.use(HackathonsRoute);
>>>>>>> 51ae68bd44f4f6ada2c787b701e0cf6fd659bcc1

routes.use(participantsRoutes);

routes.use(ValidateTokenRoute);

export default routes;
