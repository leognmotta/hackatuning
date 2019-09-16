import { Router } from 'express';
import multer from 'multer';

import multerConfig from '../../config/multer';
import AuthMiddleware from '../../app/middlewares/Auth';

import FileUserController from '../../app/controllers/FileUserController';
import FileHackathonController from '../../app/controllers/FileHackathonController';

const routes = Router();
const upload = multer(multerConfig);

routes.post(
  '/files/users',
  AuthMiddleware,
  upload.single('file'),
  FileUserController.store
);

routes.post(
  '/files/hackathons/:id',
  AuthMiddleware,
  upload.single('file'),
  FileHackathonController.store
);

export default routes;
