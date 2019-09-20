import { Router } from 'express';

import ProjectsController from '../../app/controllers/ProjectsController';
import AuthMiddleware from '../../app/middlewares/Auth';
import ProjectValidator from '../../app/validators/ProjectValidator';

const routes = Router();

routes.post(
  '/projects/teams/:id',
  AuthMiddleware,
  ProjectValidator.store,
  ProjectsController.store
);

routes.put(
  '/projects/:id',
  AuthMiddleware,
  ProjectValidator.update,
  ProjectsController.update
);

routes.get('/projects/:id', AuthMiddleware, ProjectsController.show);

export default routes;
