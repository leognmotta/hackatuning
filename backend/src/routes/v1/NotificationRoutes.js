import { Router } from 'express';

import NotificationController from '../../app/controllers/NotificationController';

import AuthMiddleware from '../../app/middlewares/Auth';

const routes = Router();

routes.get('/notifications', AuthMiddleware, NotificationController.index);

routes.put('/notifications/:id', AuthMiddleware, NotificationController.update);

export default routes;
