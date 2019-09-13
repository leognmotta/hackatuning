import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import User from '../models/User';
import authConfig from '../../config/authConfig';
import ApiError from '../../config/ApiError';

class UserConfirmEmailController {
  async update(req, res, next) {
    try {
      const { token } = req.params;

      const decoded = await promisify(jwt.verify)(
        token,
        authConfig.secret
      ).catch(() => {
        throw new ApiError(
          'Invalid token.',
          'The token has expired or is not valid.',
          401
        );
      });

      const user = await User.findOne({
        where: {
          email: decoded.email,
          confirm_email_token: token,
        },
      });

      if (!user) {
        throw new ApiError('Not Found', 'User not found!', 404);
      }

      const { id, nickname, name } = await user.update({
        confirm_email: true,
        confirm_email_token: null,
      });

      return res.json({ id, nickname, name });
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserConfirmEmailController();
