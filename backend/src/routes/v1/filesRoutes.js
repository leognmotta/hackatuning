import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../../config/multer';

import FileController from '../../app/controllers/FileController';

import AuthMiddleware from '../../app/middlewares/Auth';

const routes = Router();
const upload = multer(multerConfig);

// [POST] /v1/files
routes.post(
  '/files',
  AuthMiddleware,
  upload.single('file'),
  FileController.store
);

export default routes;
