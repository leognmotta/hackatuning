import { Router } from 'express';

import ValidateTokenController from '../../app/controllers/ValidateTokenController';
import AuthMiddleware from '../../app/middlewares/Auth';

const routes = Router();

routes.get('/validate', AuthMiddleware, ValidateTokenController.index);

export default routes;
