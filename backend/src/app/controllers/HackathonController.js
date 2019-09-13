import { Op } from 'sequelize';
import ApiError from '../../config/ApiError';
import File from '../models/File';
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
        limit: perPage,
        offset: (page - 1) * perPage,
        include: [
          {
            model: File,
            required: true,
            as: 'cover',
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

  async show() {}

  async update() {}

  async delete() {}
}

export default new HackathonController();
