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

      const participants = await Participant.findAndCountAll({
        where: {
          hackathon_id: id,
        },
        attributes: ['id'],
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

      return res.json(participants.rows);
    } catch (error) {
      return next(error);
    }
  }
}

export default new ParticipantController();
