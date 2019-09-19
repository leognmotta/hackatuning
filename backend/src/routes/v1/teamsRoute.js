import { Router } from 'express';

import TeamController from '../../app/controllers/TeamController';
import AuthMiddleware from '../../app/middlewares/Auth';
import TeamInviteController from '../../app/controllers/TeamInviteController';
import TeamMemberController from '../../app/controllers/TeamMemberController';

const routes = Router();

routes.post(
  '/teams/hackathons/:hackathonId',
  AuthMiddleware,
  TeamController.store
);

routes.get('/teams/:id', AuthMiddleware, TeamController.show);

routes.get('/teams/hackathons/:id', AuthMiddleware, TeamController.index);

routes.delete('/teams/:id', AuthMiddleware, TeamController.delete);

routes.delete(
  '/teams/:id/participants/:pId',
  AuthMiddleware,
  TeamMemberController.delete
);

routes.post(
  '/teams/:id/invites/:memberId',
  AuthMiddleware,
  TeamInviteController.store
);

routes.get('/teams/invites/me', AuthMiddleware, TeamInviteController.index);

routes.put('/teams/invites/:id', AuthMiddleware, TeamInviteController.update);

export default routes;
