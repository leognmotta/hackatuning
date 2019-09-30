import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import SessionController from '../../app/controllers/SessionController';
import SessionValidator from '../../app/validators/SessionValidator';

const routes = Router();

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

routes.post(
  '/sessions',
  bruteForce.prevent,
  SessionValidator.store,
  SessionController.store
);

export default routes;
