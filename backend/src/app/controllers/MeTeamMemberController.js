import File from '../models/File';
import User from '../models/User';
import Team from '../models/Team';
import Role from '../models/Role';
import Url from '../models/Url';
import TeamMember from '../models/TeamMember';
import Hackathon from '../models/Hackathon';

class MeTeamMemberController {
  async index(req, res, next) {
    try {
      const { page = 1, perPage = 20 } = req.query;

      const team = await TeamMember.findAndCountAll({
        where: {
          member_id: req.userId,
          is_member: true,
        },
        attributes: ['id', 'team_id'],
        include: [
          {
            model: Team,
            as: 'team',
            include: [
              {
                model: Hackathon,
                as: 'hackathon',
                attributes: ['id', 'title'],
              },
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

export default new MeTeamMemberController();
