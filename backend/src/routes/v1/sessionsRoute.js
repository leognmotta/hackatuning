import { Router } from 'express';

import SessionController from '../../app/controllers/SessionController';
import SessionValidator from '../../app/validators/SessionValidator';

const routes = Router();

routes.post('/sessions', SessionValidator.store, SessionController.store);

export default routes;
