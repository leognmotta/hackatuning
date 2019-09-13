import { Op } from 'sequelize';
import ApiError from '../../config/ApiError';
import File from '../models/File';
import User from '../models/User';
import Hackathon from '../models/Hackathon';

class HackathonController {
  async store(req, res, next) {
    try {
      req.body.organizer_id = req.userId;

      const hackathon = await Hackathon.create(req.body);

      return res.json(hackathon);
    } catch (error) {
      return next(error);
    }
  }

  async index(req, res, next) {
    try {
      const { page = 1, perPage = 20 } = req.query;

      const hackathons = await Hackathon.findAndCountAll({
        where: {
          event_date: {
            [Op.gt]: new Date(),
          },
        },
        attributes: ['id', 'title', 'subtitle', 'description'],
        limit: perPage,
        offset: (page - 1) * perPage,
        include: [
          {
            model: File,
            as: 'cover',
            attributes: ['id', 'url', 'path'],
          },
        ],
      });

      const maxPage = Math.ceil(hackathons.count / perPage);
      const previousPage = parseInt(page, 10) - 1;
      const hasPreviousPage = previousPage >= 1;
      const nextPage = parseInt(page, 10) + 1;
      const hasNextPage = maxPage > page;
      const currentPage = parseInt(page, 10);

      return res.json({
        hackathons: hackathons.rows,
        pagination: {
          maxPage,
          previousPage,
          hasPreviousPage,
          nextPage,
          hasNextPage,
          currentPage,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  async show(req, res, next) {
    try {
      const { id } = req.params;

      const hackathon = await Hackathon.findOne({
        where: { id },
        include: [
          {
            model: File,
            as: 'cover',
            attributes: ['id', 'url', 'path'],
          },
          {
            model: User,
            as: 'organizer',
            attributes: ['id', 'name', 'nickname'],
            include: [
              {
                model: File,
                as: 'avatar',
                attributes: ['id', 'url', 'path'],
              },
            ],
          },
        ],
      });

      if (!hackathon)
        throw new ApiError(
          'Not found',
          `The Hackathon event was not found with id: ${id}`,
          404
        );

      return res.json(hackathon);
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;

      const hackathon = await Hackathon.findByPk(id);

      if (!hackathon)
        throw new ApiError(
          'Not found',
          `The Hackathon event was not found with id: ${id}`,
          404
        );

      return res.json(hackathon);
    } catch (error) {
      return next(error);
    }
  }

  delete(req, res, next) {
    try {
      const { id } = req.params;

      Hackathon.destroy({ where: { id } });

      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
  }
}

export default new HackathonController();
