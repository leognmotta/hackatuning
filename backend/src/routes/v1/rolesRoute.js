import { Router } from 'express';
import RoleController from '../../app/controllers/RoleController';

const routes = Router();

routes.get('/roles', RoleController.index);

export default routes;
