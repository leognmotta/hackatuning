import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import Queue from '../../lib/Queue';
import ConfirmationResponseMail from '../jobs/ConfirmationResponseMail';

import User from '../models/User';
import authConfig from '../../config/authConfig';

class UserConfirmEmailController {
  async update(req, res, next) {
    try {
      const { token } = req.params;

      const decoded = await promisify(jwt.verify)(
        token,
        authConfig.secret
      ).catch(() => {
        return res
          .status(301)
          .redirect(`${process.env.WEB_URL}/internal-error`);
      });

      const user = await User.findOne({
        where: {
          email: decoded.email,
          confirm_email_token: token,
        },
      });

      if (!user) {
        return res
          .status(301)
          .redirect(`${process.env.WEB_URL}/internal-error`);
      }

      const { name, email } = await user.update({
        confirm_email: true,
        confirm_email_token: null,
      });

      await Queue.add(ConfirmationResponseMail.key, {
        name,
        email,
      });

      return res.status(301).redirect(process.env.WEB_URL);
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserConfirmEmailController();
