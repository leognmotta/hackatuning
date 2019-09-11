import { Router } from 'express';

import filesRoutes from './filesRoutes';

const routes = Router();

routes.use(filesRoutes);

export default routes;
