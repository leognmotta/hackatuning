import ApiError from '../../config/ApiError';
import Team from '../models/Team';
import TeamMember from '../models/TeamMember';
import Queue from '../../lib/Queue';
import TeamRemovedMemberMail from '../jobs/TeamRemovedMemberMail';
import User from '../models/User';
import Hackathon from '../models/Hackathon';
import TeamRemovedMemberNotifiyMail from '../jobs/TeamRemovedMemberNotifiyMail';

class TeamMemberController {
  async delete(req, res, next) {
    try {
      const { id: teamId, pId: memberId } = req.params;

      if (!/^[0-9]+$/.test(memberId)) {
        throw new ApiError('Invalid Params', 'Member id not valid', 400);
      }

      const team = await Team.findOne({
        where: {
          id: teamId,
        },
        include: [
          {
            model: Hackathon,
            as: 'hackathon',
          },
        ],
      });

      if (!team) {
        throw new ApiError('Not Found', 'Not found team', 404);
      }

      const isCreator = await Team.findOne({
        where: {
          creator_id: req.userId,
          id: teamId,
        },
      });

      if (!isCreator) {
        throw new ApiError(
          'Not Authorized',
          'You are note the team creator.',
          401
        );
      }

      if (isCreator && memberId === req.userId) {
        throw new ApiError(
          'Not Authorized',
          'You are the team creator and cannot remove yourself',
          401
        );
      }

      if (!isCreator && memberId !== req.userId) {
        throw new ApiError(
          'Not Authorized',
          'You are not allowed to remove a member other than yourself',
          401
        );
      }

      const isMember = await TeamMember.findOne({
        where: {
          team_id: teamId,
          member_id: memberId,
          is_member: true,
        },
      });

      if (isCreator && !isMember) {
        throw new ApiError(
          'Not Authorized',
          'You tried to remove someone who is not a member of your team',
          401
        );
      }

      if (!isCreator && !isMember) {
        throw new ApiError(
          'Not Authorized',
          'You are neither a creator nor a member of this team.',
          401
        );
      }

      const user = await User.findByPk(memberId);

      if (!user) {
        throw new ApiError(
          'Not Found',
          'The informed member is not a system user',
          404
        );
      }

      await TeamMember.destroy({
        where: {
          member_id: memberId,
          team_id: teamId,
        },
      });

      const creator = await User.findByPk(team.creator_id);

      await Queue.add(TeamRemovedMemberMail.key, {
        user: {
          name: user.name,
          email: user.email,
        },
        hackathon: team.hackathon.title,
        teamId,
      });

      await Queue.add(TeamRemovedMemberNotifiyMail.key, {
        creator: {
          name: creator.name,
          email: creator.email,
        },
        member: user.name,
        hackathon: team.hackathon.title,
        teamId,
      });

      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  }
}

export default new TeamMemberController();
