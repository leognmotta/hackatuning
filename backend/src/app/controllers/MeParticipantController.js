import Hackathon from '../models/Hackathon';
import File from '../models/File';
import User from '../models/User';

class MeParticipantController {
  async index(req, res, next) {
    try {
      const { page = 1, perPage = 20 } = req.query;

      const hackathons = await Hackathon.findAndCountAll({
        attributes: [
          'id',
          'title',
          'subtitle',
          'description',
          'event_date',
          'event_ending',
          'cover_id',
          'createdAt',
        ],
        limit: perPage,
        offset: (page - 1) * perPage,
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: File,
            as: 'cover',
            attributes: ['id', 'url', 'path'],
          },
          {
            model: User,
            as: 'participants',
            attributes: [],
            where: {
              id: req.userId,
            },
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
}

export default new MeParticipantController();
