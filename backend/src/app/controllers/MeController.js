import Hackathon from '../models/Hackathon';
import File from '../models/File';

class MeController {
  async index(req, res, next) {
    try {
      const { page = 1, perPage = 20 } = req.query;

      const hackathons = await Hackathon.findAndCountAll({
        where: {
          organizer_id: req.userId,
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
        order: [['createdAt', 'DESC']],
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

export default new MeController();
