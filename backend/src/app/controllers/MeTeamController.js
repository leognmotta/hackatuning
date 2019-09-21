import File from '../models/File';
import User from '../models/User';
import Team from '../models/Team';
import Role from '../models/Role';
import Url from '../models/Url';
import TeamMember from '../models/TeamMember';

class MeTeamController {
  async index(req, res, next) {
    try {
      const { page = 1, perPage = 20 } = req.query;
      const { hackathon_id } = req.query;

      let where = {
        creator_id: req.userId,
      };

      if (hackathon_id) {
        where = {
          creator_id: req.userId,
          hackathon_id,
        };
      }

      const team = await Team.findAndCountAll({
        where,
        attributes: ['id', 'creator_id'],
        include: [
          {
            model: User,
            as: 'creator',
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
          },
          {
            model: User,
            as: 'members',
            through: { attributes: [] },
            attributes: ['id', 'name', 'nickname', 'bio', 'avatar_id'],
            include: [
              {
                model: TeamMember,
                as: 'member',
                where: {
                  is_member: true,
                },
              },
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
          },
        ],
      });

      const maxPage = Math.ceil(team.count / perPage);
      const previousPage = parseInt(page, 10) - 1;
      const hasPreviousPage = previousPage >= 1;
      const nextPage = parseInt(page, 10) + 1;
      const hasNextPage = maxPage > page;
      const currentPage = parseInt(page, 10);

      return res.json({
        teams: team.rows,
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

export default new MeTeamController();
