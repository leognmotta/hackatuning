import jwt from 'jsonwebtoken';

import authConfig from '../../config/authConfig';
import User from '../models/User';
import ApiError from '../../config/ApiError';
import Url from '../models/Url';
import UserRole from '../models/UserRole';
import Role from '../models/Role';
import Queue from '../../lib/Queue';
import ConfirmMail from '../jobs/ConfirmMail';
import UserUrl from '../models/UserUrl';
import File from '../models/File';
import Hackathon from '../models/Hackathon';

class UserController {
  async store(req, res, next) {
    try {
      req.body.nickname = req.body.nickname.replace(/\s+/g, '').toLowerCase();

      const { email, urls, roles, nickname } = req.body;

      const emailExists = await User.findOne({
        where: { email },
      });

      if (emailExists) {
        throw new ApiError(
          'Validation Error',
          'Email already exists in another user',
          400
        );
      }

      const nicknameExists = await User.findOne({
        where: { nickname },
      });

      if (nicknameExists) {
        throw new ApiError(
          'Validation Error',
          'Nickname already exists in another user',
          400
        );
      }

      const token = await jwt.sign({ email }, authConfig.secret, {
        expiresIn: '1h',
      });

      req.body.confirm_email = false;
      req.body.confirm_email_token = token;

      const user = await User.create(req.body);

      await Queue.add(ConfirmMail.key, {
        user: {
          name: user.name,
          email: user.email,
        },
        link: `${process.env.WEB_URL}/confirm?tk=${token}`,
      });

      if (urls && urls.length > 0) {
        await Promise.all(
          urls.map(async url => {
            const newUrl = await Url.create({ url });

            await UserUrl.create({
              url_id: newUrl.id,
              user_id: user.id,
            });
          })
        );
      }

      if (roles && roles.length > 0) {
        await Promise.all(
          roles.map(async role => {
            const roleExists = await Role.findByPk(role);

            if (roleExists) {
              await UserRole.create({ role_id: role, user_id: user.id });
            }
          })
        );
      }

      return res
        .status(201)
        .json({ id: user.id, nickname: user.nickname, name: user.name });
    } catch (error) {
      return next(error);
    }
  }

  async show(req, res, next) {
    try {
      const { nickname } = req.params;

      const user = await User.findOne({
        where: {
          nickname,
        },
        attributes: ['id', 'name', 'nickname', 'bio', 'avatar_id'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'url', 'path'],
          },
          {
            model: Role,
            as: 'roles',
            through: { attributes: [] },
            attributes: ['id', 'name'],
          },
          {
            model: Url,
            as: 'urls',
            through: { attributes: [] },
            attributes: ['id', 'url'],
          },
        ],
      });

      if (!user) {
        throw new ApiError('Not Found', 'User Not Found', 404);
      }

      return res.json(user);
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      if (req.body.nickname) {
        req.body.nickname = req.body.nickname.replace(/\s+/g, '').toLowerCase();
      }

      const { email, urls, roles, nickname } = req.body;

      if (email) {
        const emailExists = await User.findOne({
          where: { email },
        });

        if (emailExists) {
          throw new ApiError(
            'Validation Error',
            'Email already exists in another user',
            400
          );
        }
      }

      if (nickname) {
        const nicknameExists = await User.findOne({
          where: { nickname },
        });

        if (nicknameExists) {
          throw new ApiError(
            'Validation Error',
            'Nickname already exists in another user',
            400
          );
        }
      }

      const user = await User.findOne({
        where: { id: req.userId },
      });

      if (!user) {
        throw new ApiError('Not Found', 'User not found!', 404);
      }

      if (user.email !== email) {
        const token = await jwt.sign({ email }, authConfig.secret, {
          expiresIn: '1h',
        });

        req.body.confirm_email = false;
        req.body.confirm_email_token = token;

        await Queue.add(ConfirmMail.key, {
          user: {
            name: user.name,
            email: user.email,
          },
          link: `${process.env.WEB_URL}/confirm?tk=${token}`,
        });
      }

      if (urls && urls.length > 0) {
        await UserUrl.destroy({
          where: {
            user_id: user.id,
          },
        });

        await Promise.all(
          urls.map(async url => {
            const newUrl = await Url.create({ url });

            await UserUrl.create({
              url_id: newUrl.id,
              user_id: user.id,
            });
          })
        );
      }

      if (roles && roles.length > 0) {
        await UserRole.destroy({
          where: {
            user_id: user.id,
          },
        });

        await Promise.all(
          roles.map(async role => {
            const roleExists = await Role.findByPk(role);

            if (roleExists) {
              await UserRole.create({ role_id: role, user_id: user.id });
            }
          })
        );
      }

      const { id, name, nickname: userNick } = await user.update(req.body);

      return res.json({
        id,
        userNick,
        name,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
