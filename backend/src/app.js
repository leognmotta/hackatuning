import 'dotenv/config';

import express from 'express';
import path from 'path';
import routes from './routes';
import ErrorHandler from './app/middlewares/ErrorHandler';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.errorMiddlewares();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
  }

  routes() {
    this.server.use(routes);
  }

  errorMiddlewares() {
    this.server.use(ErrorHandler.catchNotFound);
    this.server.use(ErrorHandler.catchErrors);
  }
}

export default new App().server;
