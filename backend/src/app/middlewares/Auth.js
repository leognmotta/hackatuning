import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import ApiError from '../../config/ApiError';
import authConfig from '../../config/authConfig';

class Auth {
  async checkToken(req, res, next) {
    try {
      const { authorization: authHeader } = req.headers;

      if (!authHeader) {
        throw new ApiError(
          'No token provided.',
          'Your request most provide a Bearer token validation to access this route.',
          401
        );
      }

      const [, token] = authHeader.split(' ');

      const decoded = await promisify(jwt.verify)(
        token,
        authConfig.secret
      ).catch(() => {
        throw new ApiError(
          'Invalid token.',
          'The token provided is not valid.',
          401
        );
      });

      req.userId = decoded.id;

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new Auth().checkToken;
