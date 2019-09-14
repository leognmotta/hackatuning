import { Op } from 'sequelize';
import ApiError from '../../config/ApiError';
import Participant from '../models/Participant';
import Hackathon from '../models/Hackathon';
import User from '../models/User';
import File from '../models/File';
import Role from '../models/Role';

class ParticipantController {
  async store(req, res, next) {
    try {
      const { id } = req.params;

      const hackathon = await Hackathon.findOne({
        where: {
          id,
          event_date: {
            [Op.gt]: new Date(),
          },
        },
      });

      if (!hackathon) {
        throw new ApiError(
          'Invalid subscription',
          'Either the event was not found or already happened',
          400
        );
      }

      await Participant.create({
        hackathon_id: id,
        user_id: req.userId,
      });

      return res.json();
    } catch (error) {
      return next(error);
    }
  }

  async index(req, res, next) {
    try {
      const { id } = req.params;
      const { page = 1, perPage = 20 } = req.query;

      const isParticipant = await Participant.findOne({
        where: {
          hackathon_id: id,
          user_id: req.userId,
        },
      });

      if (!isParticipant) {
        throw new ApiError(
          'Not participant',
          'You need to subscribe to this hackathon, before you see participants',
          400
        );
      }

      const participants = await Participant.findAndCountAll({
        where: {
          hackathon_id: id,
        },
        attributes: [],
        limit: perPage,
        offset: (page - 1) * perPage,
        subQuery: false,
        include: [
          {
            model: User,
            as: 'participant',
            attributes: ['id', 'name', 'nickname', 'bio'],
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
            ],
          },
        ],
      });

      const maxPage = Math.ceil(participants.count / perPage);
      const previousPage = parseInt(page, 10) - 1;
      const hasPreviousPage = previousPage >= 1;
      const nextPage = parseInt(page, 10) + 1;
      const hasNextPage = maxPage > page;
      const currentPage = parseInt(page, 10);

      return res.json({
        participants: participants.rows,
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
}

export default new ParticipantController();
