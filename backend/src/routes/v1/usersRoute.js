import { Router } from 'express';

import UserController from '../../app/controllers/UserController';
import UserValidator from '../../app/validators/UserValidator';
import AuthMiddleware from '../../app/middlewares/Auth';

const routes = Router();

routes.post('/users', UserValidator.store, UserController.store);

routes.put(
  '/users',
  AuthMiddleware,
  UserValidator.update,
  UserController.update
);

routes.get('/users/:nickname', UserController.show);

export default routes;
