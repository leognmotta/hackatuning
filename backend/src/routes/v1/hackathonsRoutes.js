import { Router } from 'express';

import HackathonController from '../../app/controllers/HackathonController';
import HackathonValidator from '../../app/validators/HackathonValidator';

import AuthMiddleware from '../../app/middlewares/Auth';

const routes = Router();

routes.post(
  '/hackathons',
  AuthMiddleware,
  HackathonValidator.store,
  HackathonController.store
);

routes.get('/hackathons', AuthMiddleware, HackathonController.index);

export default routes;
