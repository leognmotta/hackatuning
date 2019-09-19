import { Router } from 'express';

import MeController from '../../app/controllers/MeController';
import AuthMiddleware from '../../app/middlewares/Auth';
import MeParticipantController from '../../app/controllers/MeParticipantController';

const routes = Router();

routes.get('/me/hackas', AuthMiddleware, MeController.index);

routes.get(
  '/me/participants/hackas',
  AuthMiddleware,
  MeParticipantController.index
);

export default routes;
