import { resolve } from 'path';
import * as fs from 'fs';

import File from '../models/File';
import ApiError from '../../config/ApiError';
import User from '../models/User';

class FileUserController {
  async store(req, res, next) {
    try {
      const { originalname: name, filename: path, size, mimetype } = req.file;

      if (!name || !path) {
        throw new ApiError(
          'Validations Fails',
          'You made an invalid request',
          400
        );
      }

      if (!['image/png', 'image/jpeg'].includes(mimetype)) {
        throw new ApiError(
          'Extension not allowed',
          'Only .jpg and .png file allowed',
          400
        );
      }

      if (size > 15000000) {
        throw new ApiError(
          'File too large',
          'Only files up to 15MB allowed',
          400
        );
      }

      const user = await User.findOne({
        where: {
          id: req.userId,
        },
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'url', 'path'],
          },
        ],
      });

      if (!user) {
        throw new ApiError('Not Found', 'User not found', 404);
      }

      const file = await File.create({
        name,
        path,
      });

      if (user.avatar_id) {
        const dir = resolve(
          __dirname,
          '..',
          '..',
          '..',
          'tmp',
          'uploads',
          user.avatar.path
        );

        const fileExists = await fs.existsSync(dir);

        if (fileExists) {
          await fs.unlinkSync(dir);
        }

        await File.destroy({ where: { id: user.avatar_id } });
      }

      await user.update({ avatar_id: file.id });

      return res.json(file);
    } catch (error) {
      return next(error);
    }
  }
}

export default new FileUserController();
