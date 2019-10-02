import ApiError from '../../config/ApiError';
import Mentor from '../models/Mentor';
import Hackathon from '../models/Hackathon';
import User from '../models/User';
import File from '../models/File';

import Queue from '../../lib/Queue';

class ParticipantController {
  async store(req, res, next) {
    try {
      const { id } = req.params;

      const hackathon = await Hackathon.findByPk(id);

      if (!hackathon)
        throw new ApiError(
          'Not found',
          'No Hackathon were found with the provided id',
          400
        );

      const mentor = await Mentor.findOne({
        where: { hackathon_id: id, user_id: req.userId },
      });

      if (mentor)
        throw new ApiError(
          'Already mentor',
          'You are already a mentor at this hackathon',
          400
        );

      await Mentor.create({
        hackathon_id: id,
        user_id: req.userId,
      });

      return res.status(201).end();
    } catch (error) {
      return next(error);
    }
  }

  async index(req, res, next) {
    try {
      const { id } = req.params;

      const mentors = await Mentor.findAll({
        where: { hackathon_id: id, user_id: req.userId },
        attributes: ['id'],
        include: [
          {
            model: User,
            as: 'mentor',
            attributes: ['id', 'name', 'nickname', 'calendly', 'bio'],
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

      return res.json(mentors);
    } catch (error) {
      return next(error);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      await Mentor.destroy({
        where: { hackathon_id: id, user_id: req.userId },
      });

      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
  }
}

export default new ParticipantController();
