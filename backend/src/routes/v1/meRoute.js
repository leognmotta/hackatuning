import { Router } from 'express';

import MeController from '../../app/controllers/MeController';
import AuthMiddleware from '../../app/middlewares/Auth';
import MeParticipantController from '../../app/controllers/MeParticipantController';
import MeTeamController from '../../app/controllers/MeTeamController';
import MeTeamMemberController from '../../app/controllers/MeTeamMemberController';

const routes = Router();

routes.get('/me/hackas', AuthMiddleware, MeController.index);

routes.get(
  '/me/participants/hackas',
  AuthMiddleware,
  MeParticipantController.index
);

routes.get('/me/teams/creator', AuthMiddleware, MeTeamController.index);

routes.get('/me/teams/member', AuthMiddleware, MeTeamMemberController.index);

export default routes;
