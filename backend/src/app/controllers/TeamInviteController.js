import { Op } from 'sequelize';

import ApiError from '../../config/ApiError';
import Team from '../models/Team';
import TeamMember from '../models/TeamMember';
import Participant from '../models/Participant';
import Queue from '../../lib/Queue';
import TeamInviteMail from '../jobs/TeamInviteMail';
import User from '../models/User';
import Hackathon from '../models/Hackathon';
import TeamAcceptInviteMail from '../jobs/TeamAcceptInviteMail';
import TeamDeniedInviteMail from '../jobs/TeamDeniedInviteMail';
import File from '../models/File';
import Role from '../models/Role';
import Url from '../models/Url';

class TeamInviteController {
  async store(req, res, next) {
    try {
      const { memberId: memberNickname } = req.params;

      const memberFind = await User.findOne({
        where: {
          nickname: memberNickname,
        },
      });

      if (!memberFind) {
        throw new ApiError('Not Found', 'Not found member', 404);
      }

      const memberId = memberFind.id;

      if (memberId === req.userId) {
        throw new ApiError('Not Authorized', 'You cannot invite yourself', 401);
      }

      const team = await Team.findOne({
        where: {
          id: req.params.id,
          creator_id: req.userId,
        },
      });

      if (!team) {
        throw new ApiError(
          'Not Authorized',
          'You are not the creator of this team or the team does not exist',
          401
        );
      }

      const isParticipant = await Participant.findOne({
        where: {
          hackathon_id: team.hackathon_id,
          user_id: memberId,
        },
      });

      if (!isParticipant) {
        throw new ApiError(
          'Not Authorized',
          'You have invited someone who is not a hackahton participant',
          401
        );
      }

      const isAlreadyMemberThisTeam = await TeamMember.findOne({
        where: {
          member_id: memberId,
          team_id: req.params.id,
          is_member: true,
        },
        include: [
          {
            model: Team,
            as: 'team',
            where: {
              hackathon_id: team.hackathon_id,
            },
          },
        ],
      });

      if (isAlreadyMemberThisTeam) {
        throw new ApiError(
          'Not Authorized',
          'This participant is already in your team',
          401
        );
      }

      const isMemberInAnotherTeam = await TeamMember.findOne({
        where: {
          member_id: memberId,
          is_member: true,
        },
        include: [
          {
            model: Team,
            as: 'team',
            where: {
              hackathon_id: team.hackathon_id,
            },
          },
        ],
      });

      if (isMemberInAnotherTeam) {
        throw new ApiError(
          'Not Authorized',
          'This participant is already in another team',
          401
        );
      }

      const isMember = await TeamMember.findOne({
        where: {
          team_id: req.params.id,
          member_id: memberId,
          is_member: true,
        },
      });

      if (isMember) {
        throw new ApiError(
          'Not Authorized',
          'You sent an invitation to a participant already on a team',
          401
        );
      }

      const hasInvitationTeam = await TeamMember.findOne({
        where: {
          team_id: req.params.id,
          member_id: memberId,
          is_member: false,
        },
      });

      if (hasInvitationTeam) {
        throw new ApiError(
          'Not Authorized',
          'You have already invited this participant',
          401
        );
      }

      const existsMember = await User.findByPk(memberId);

      if (!existsMember) {
        throw new ApiError(
          'Not Found',
          'The member you are trying to invite does not exist',
          404
        );
      }

      const existsHackathon = await Hackathon.findByPk(team.hackathon_id);

      if (!existsHackathon) {
        throw new ApiError(
          'Not Found',
          'The hackathon you are trying to invite does not exist',
          404
        );
      }

      if (!existsHackathon) {
        throw new ApiError(
          'Not Found',
          'The hackathon you are trying to invite does not exist',
          404
        );
      }

      const memberIsCreatorTeamInHackathon = await Team.findOne({
        where: {
          hackathon_id: team.hackathon_id,
          creator_id: memberId,
        },
      });

      if (memberIsCreatorTeamInHackathon) {
        throw new ApiError(
          'Not Authorized',
          'You sent an invitation to a participant already on a team',
          401
        );
      }

      const member = await TeamMember.create({
        team_id: req.params.id,
        member_id: memberId,
        is_member: false,
      });

      const creator = await User.findByPk(req.userId);

      await Queue.add(TeamInviteMail.key, {
        user: {
          name: existsMember.name,
          email: existsMember.email,
        },
        hackathon: existsHackathon.title,
        creator: creator.name,
        link: `${process.env.WEB_URL}/invites`,
      });

      return res.status(201).json(member);
    } catch (error) {
      return next(error);
    }
  }

  async index(req, res, next) {
    try {
      const invite = await TeamMember.findAll({
        where: {
          member_id: req.userId,
          is_member: false,
        },
        include: [
          {
            model: Team,
            as: 'team',
            attributes: ['id', 'creator_id'],
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
        order: [['created_at', 'DESC']],
      });

      return res.json(invite);
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { denied } = req.body;

      const member = await TeamMember.findOne({
        where: {
          id,
        },
        include: [
          {
            model: User,
            as: 'member',
            attributes: ['id', 'name'],
          },
          {
            model: Team,
            as: 'team',
            attributes: ['hackathon_id'],
            include: [
              {
                model: Hackathon,
                as: 'hackathon',
                attributes: ['id', 'title'],
              },
              {
                model: User,
                as: 'creator',
                attributes: ['id', 'name', 'email'],
              },
            ],
          },
        ],
      });

      if (!member) {
        throw new ApiError('Not Found', 'Not found invite', 401);
      }

      const { hackathon_id } = member.team;
      const { title } = member.team.hackathon;
      const { name: member_name } = member.member;
      const { name, email } = member.team.creator;

      if (req.userId !== member.member_id) {
        throw new ApiError(
          'Not Authorized',
          "You cannot accept this invitation, because it doesn't belong to you",
          401
        );
      }

      const existsTeam = await Participant.findOne({
        where: {
          hackathon_id,
          user_id: member.member_id,
          team_member_id: { [Op.ne]: null },
        },
      });

      if (existsTeam) {
        throw new ApiError('Not Authorized', 'You already have a team', 401);
      }

      if (denied) {
        await member.destroy();

        await Queue.add(TeamDeniedInviteMail.key, {
          creator: {
            name,
            email,
          },
          hackathon: title,
          member: member_name,
        });

        return res.status(204).json();
      }

      await member.update({ is_member: true });

      await Participant.update(
        {
          team_member_id: id,
        },
        {
          where: {
            hackathon_id,
            user_id: member.member_id,
          },
        }
      );

      await TeamMember.destroy({
        where: {
          member_id: member.member_id,
          is_member: false,
        },
        include: [
          {
            model: Team,
            as: 'team',
            where: {
              hackathon_id,
            },
          },
        ],
      });

      await Queue.add(TeamAcceptInviteMail.key, {
        creator: {
          name,
          email,
        },
        hackathon: title,
        member: member_name,
      });

      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  }
}

export default new TeamInviteController();
