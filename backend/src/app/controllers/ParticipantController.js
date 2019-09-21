import { Op } from 'sequelize';

import ApiError from '../../config/ApiError';
import Participant from '../models/Participant';
import Hackathon from '../models/Hackathon';
import User from '../models/User';
import File from '../models/File';
import Role from '../models/Role';
import Url from '../models/Url';

import Queue from '../../lib/Queue';
import Notification from '../schemas/Notifications';
import ParticipantSubscribeMail from '../jobs/ParticipantSubscribeMail';
import ParticipantUnsubscribeMail from '../jobs/ParticipantUnsubscribeMail';
import Team from '../models/Team';
import TeamMember from '../models/TeamMember';

class ParticipantController {
  async store(req, res, next) {
    try {
      const { id } = req.params;

      const hackathon = await Hackathon.findOne({
        where: {
          id,
          deadline_subscription: {
            [Op.gte]: new Date(),
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

      const isParticipant = await Participant.findOne({
        where: { user_id: req.userId, hackathon_id: id },
      });

      if (isParticipant) {
        throw new ApiError(
          'Already a participant',
          'You are already a participant in this hackathon',
          400
        );
      }

      await Participant.create({
        hackathon_id: id,
        user_id: req.userId,
      });

      const user = await User.findByPk(req.userId);

      await Notification.create({
        content: `Hey ${user.name} you are now subscribed to ${hackathon.title}`,
        user: req.userId,
        url: `${process.env.WEB_URL}/hackathons/${hackathon.id}`,
      });

      await Queue.add(ParticipantSubscribeMail.key, {
        name: user.name,
        email: user.email,
        hackathon_title: hackathon.title,
        event_date: hackathon.event_date,
        deadline_team_creation: hackathon.deadline_team_creation,
      });

      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  }

  async index(req, res, next) {
    try {
      const { id } = req.params;

      const {
        page = 1,
        perPage = 20,
        onlyNoTeam,
        onlyTeam,
        search,
        filterRoles,
      } = req.query;

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

      let where = {
        hackathon_id: id,
      };

      if (onlyTeam) {
        where = {
          hackathon_id: id,
          [Op.or]: [
            { team_member_id: { [Op.ne]: null } },
            { team_creator_id: { [Op.ne]: null } },
          ],
        };
      }

      if (onlyNoTeam) {
        where = {
          hackathon_id: id,
          team_member_id: null,
          team_creator_id: null,
        };
      }

      let whereSearch;

      if (search) {
        whereSearch = {
          [Op.or]: [
            { name: { [Op.substring]: search } },
            { email: { [Op.substring]: search } },
            { nickname: { [Op.substring]: search } },
          ],
        };
      }
      const include = [
        {
          model: User,
          as: 'participant',
          attributes: ['id', 'name', 'nickname', 'bio'],
          where: whereSearch,
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
      ];

      if (filterRoles) {
        include.push({
          model: Role,
          as: 'search_role',
          through: { attributes: [] },
          attributes: ['id', 'name'],
          where: {
            id: filterRoles,
          },
        });
      }

      const participants = await Participant.findAndCountAll({
        where,
        attributes: [],
        limit: perPage,
        offset: (page - 1) * perPage,
        subQuery: false,
        include,
      });

      const userLoggedTeamCreator = await Team.findOne({
        where: {
          hackathon_id: id,
          creator_id: req.userId,
        },
      });

      if (userLoggedTeamCreator) {
        await Promise.all(
          participants.rows.map(async participant => {
            const invite = await TeamMember.findOne({
              where: {
                team_id: userLoggedTeamCreator.id,
                member_id: participant.participant.id,
              },
            });

            if (invite) {
              if (invite.is_member) {
                participant.dataValues.statusInvite = 'is_member';
              } else {
                participant.dataValues.statusInvite = 'sending';
              }
            }
          })
        );
      }

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

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const { name, email } = await User.findByPk(req.userId);

      const hackathon = await Hackathon.findByPk(id);

      if (!hackathon) {
        throw new ApiError('Not Found', 'Hackathon not found!', 404);
      }

      const isTeamCreator = await Team.findOne({
        where: {
          hackathon_id: id,
          creator_id: req.userId,
        },
      });

      if (isTeamCreator) {
        throw new ApiError(
          'Not Authorized',
          'You must close your team before you can unsubscribe from hackathon!',
          401
        );
      }

      const isTeamMember = await TeamMember.findOne({
        where: {
          member_id: req.userId,
          is_member: true,
        },
        include: [
          {
            model: Team,
            as: 'team',
            where: {
              hackathon_id: id,
            },
          },
        ],
      });

      if (isTeamMember) {
        throw new ApiError(
          'Not Authorized',
          'You must close your team before you can unsubscribe from hackathon!',
          401
        );
      }

      await Notification.create({
        content: `Hey ${name} you are no longer subscribed to ${hackathon.title}`,
        user: req.userId,
      });

      await Queue.add(ParticipantUnsubscribeMail.key, {
        name,
        email,
        title: hackathon.title,
        deadline_subscription: hackathon.deadline_subscription,
      });

      Participant.destroy({
        where: {
          user_id: req.userId,
          hackathon_id: id,
        },
      });

      TeamMember.destroy({
        where: {
          member_id: req.userId,
        },
        include: [
          {
            model: Team,
            as: 'team',
            where: {
              hackathon_id: id,
            },
          },
        ],
      });

      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
  }
}

export default new ParticipantController();
