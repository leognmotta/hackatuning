import 'dotenv/config';

import express from 'express';
import http from 'http';
import helmet from 'helmet';
import redis from 'redis';
import RateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';
import io from 'socket.io';
import cors from 'cors';
import path from 'path';
import routes from './routes/v1';
import ErrorHandler from './app/middlewares/ErrorHandler';

import './database';

class App {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = io.listen(this.server);
    this.connectSocket();
    this.middlewares();
    this.routes();
    this.errorMiddlewares();
  }

  middlewares() {
    this.app.use(cors({ origin: process.env.WEB_URL }));
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(
      '/static',
      express.static(path.resolve(__dirname, '..', 'tmp', 'static'))
    );
    this.app.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );

    if (process.env.NODE_ENV !== 'development') {
      this.app.use(
        new RateLimit({
          store: new RateLimitRedis({
            client: redis.createClient({
              host: process.env.REDIS_HOST,
              port: process.env.REDIS_PORT,
            }),
          }),
          windowMs: 1000 * 60 * 10,
          max: 400,
        })
      );
    }
  }

  routes() {
    this.app.use('/v1', routes);
  }

  errorMiddlewares() {
    this.app.use(ErrorHandler.catchNotFound);
    this.app.use(ErrorHandler.catchErrors);
  }

  connectSocket() {
    let socketId;

    this.io.on('connection', socket => {
      socketId = socket.id;
    });

    this.app.use((req, res, next) => {
      req.socketId = socketId;
      req.io = this.io;

      return next();
    });
  }
}

export default new App().server;
