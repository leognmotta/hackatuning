import { Router } from 'express';

import UserController from '../../app/controllers/UserController';
import UserValidator from '../../app/validators/UserValidator';
import AuthMiddleware from '../../app/middlewares/Auth';
import UserRecoverController from '../../app/controllers/UserRecoverController';
import UserRecoverValidator from '../../app/validators/UserRecoverValidator';

const routes = Router();

routes.post('/users', UserValidator.store, UserController.store);

routes.put(
  '/users',
  AuthMiddleware,
  UserValidator.update,
  UserController.update
);

routes.get('/users/:nickname', UserController.show);

routes.post(
  '/users/recover',
  UserRecoverValidator.store,
  UserRecoverController.store
);

routes.put(
  '/users/recover/:token',
  UserRecoverValidator.update,
  UserRecoverController.update
);

export default routes;
