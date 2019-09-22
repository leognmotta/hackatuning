import { Op } from 'sequelize';
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

const convertToSlug = text => {
  const a = 'àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
  const b = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
  const p = new RegExp(a.split('').join('|'), 'g');
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special chars
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[\s\W-]+/g, '-'); // Replace spaces, non-word characters and dashes with a single dash (-)
};

class UserController {
  async store(req, res, next) {
    try {
      req.body.nickname = convertToSlug(req.body.nickname);

      const { email, urls, roles, nickname } = req.body;

      if (/^[0-9]+$/.test(nickname)) {
        throw new ApiError(
          'Validation Error',
          'Nickname cannot be a number',
          400
        );
      }

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
        link: `${process.env.APP_URL}/v1/users/confirm/${token}`,
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

      let where;

      if (/^[0-9]+$/.test(nickname)) {
        where = {
          id: nickname,
        };
      } else {
        where = {
          nickname,
        };
      }

      const user = await User.findOne({
        where,
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
        req.body.nickname = convertToSlug(req.body.nickname);
      }

      const { email, urls, roles, nickname } = req.body;

      if (email) {
        const emailExists = await User.findOne({
          where: {
            email,
            [Op.ne]: req.userId,
          },
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
          where: {
            nickname,
            id: { [Op.ne]: req.userId },
          },
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

      if (email && user.email !== email) {
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
        const urlsFind = await Url.findAll({
          include: [
            {
              model: User,
              as: 'users',
              where: {
                id: req.userId,
              },
            },
          ],
        });

        if (urlsFind.length) {
          await Promise.all(
            urlsFind.map(async url => {
              await Url.destroy({
                where: {
                  id: url.id,
                },
              });
            })
          );
        }

        await Promise.all(
          urls.map(async url => {
            const newUrl = await Url.create({ url });

            await UserUrl.create({
              url_id: newUrl.id,
              user_id: req.userId,
            });
          })
        );
      }

      if (roles && roles.length > 0) {
        await UserRole.destroy({
          where: {
            user_id: req.userId,
          },
        });

        await Promise.all(
          roles.map(async role => {
            const roleExists = await Role.findByPk(role);

            if (roleExists) {
              await UserRole.create({
                role_id: roleExists.id,
                user_id: req.userId,
              });
            }
          })
        );
      }

      const { id, name, nickname: userNick } = await user.update(req.body);

      return res.json({
        id,
        nickaname: userNick,
        name,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
