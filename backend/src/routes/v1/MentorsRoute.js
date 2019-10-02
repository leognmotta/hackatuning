import { Router } from 'express';

import MentorController from '../../app/controllers/MentorController';
import InviteMentorController from '../../app/controllers/InviteMentorController';

import AuthMiddleware from '../../app/middlewares/Auth';

const routes = Router();

routes.get('/hackathons/:id/mentors', AuthMiddleware, MentorController.index);

routes.post('/hackathons/:id/mentors', AuthMiddleware, MentorController.store);

routes.post(
  '/hackathons/:id/mentors/invite',
  AuthMiddleware,
  InviteMentorController.store
);

routes.get(
  '/hackathons/:id/mentors/invite/:token',
  InviteMentorController.show
);

routes.delete(
  '/hackathons/:id/mentors',
  AuthMiddleware,
  MentorController.delete
);

export default routes;
