import { Router } from 'express';

import ParticipantController from '../../app/controllers/ParticipantController';

import AuthMiddleware from '../../app/middlewares/Auth';

const routes = Router();

routes.get(
  '/hackathons/:id/participants',
  AuthMiddleware,
  ParticipantController.index
);

routes.post(
  '/hackathons/:id/participants',
  AuthMiddleware,
  ParticipantController.store
);

routes.delete(
  '/hackathons/:id/participants',
  AuthMiddleware,
  ParticipantController.delete
);

export default routes;
