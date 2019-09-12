import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/authConfig';
import ApiError from '../../config/ApiError';

class SessionController {
  async store(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new ApiError(
          'Invalid Credential',
          'E-mail or password does not match!',
          401
        );
      }

      if (!(await user.checkPassword(password))) {
        throw new ApiError(
          'Invalid Credential',
          'E-mail or password does not match!',
          401
        );
      }

      const { id, name } = user;

      return res.json({
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new SessionController();
