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
routes.get('/hackathons/:id', AuthMiddleware, HackathonController.show);

routes.put(
  '/hackathons/:id',
  AuthMiddleware,
  HackathonValidator.update,
  HackathonController.update
);

routes.delete('/hackathons/:id', AuthMiddleware, HackathonController.delete);

export default routes;
