import ApiError from '../../config/ApiError';
import Participant from '../models/Participant';
import Team from '../models/Team';
import User from '../models/User';
import TeamMember from '../models/TeamMember';
import File from '../models/File';
import Role from '../models/Role';
import Url from '../models/Url';

class TeamController {
  async store(req, res, next) {
    try {
      const { hackathonId } = req.params;

      const isParticipant = await Participant.findOne({
        where: {
          hackathon_id: hackathonId,
          user_id: req.userId,
        },
      });

      if (!isParticipant) {
        throw new ApiError(
          'Not Authorized',
          'You are not a participant in this hackathon',
          401
        );
      }

      const existsTeam = await Team.findOne({
        where: {
          hackathon_id: hackathonId,
          creator_id: req.userId,
        },
      });

      if (existsTeam) {
        throw new ApiError(
          'Existing Team',
          'You already created a team in this hackathon',
          400
        );
      }

      const isMember = await Team.findOne({
        where: {
          hackathon_id: hackathonId,
        },
        include: [
          {
            model: User,
            as: 'members',
            where: {
              id: req.userId,
            },
          },
        ],
      });

      if (isMember) {
        throw new ApiError(
          'Existing Team',
          'You are already in a team, to create a team, you must first leave your current team',
          401
        );
      }

      const team = await Team.create({
        creator_id: req.userId,
        hackathon_id: hackathonId,
      });

      return res.status(201).json(team);
    } catch (error) {
      return next(error);
    }
  }

  async show(req, res, next) {
    try {
      const team = await Team.findOne({
        where: {
          id: req.params.id,
        },
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
                  team_id: req.params.id,
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

      return res.json(team);
    } catch (error) {
      return next(error);
    }
  }

  async index(req, res, next) {
    try {
      const team = await Team.findAll({
        where: {
          hackathon_id: req.params.id,
        },
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
                  team_id: req.params.id,
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

      return res.json(team);
    } catch (error) {
      return next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const existsParticipants = await TeamMember.findOne({
        where: {
          team_id: req.params.id,
          is_member: true,
        },
      });

      if (existsParticipants) {
        throw new ApiError(
          'Not Authorized',
          'To delete a team, you must first remove members',
          401
        );
      }

      const team = await Team.findByPk(req.params.id);

      if (!team) {
        throw new ApiError('Not Found', 'Not found team', 404);
      }

      const isCreator = await Team.findOne({
        where: {
          id: req.params.id,
          creator_id: req.userId,
        },
      });

      if (!isCreator) {
        throw new ApiError(
          'Not Authorized',
          'you can only delete teams you created',
          401
        );
      }

      await TeamMember.destroy({
        where: {
          team_id: req.params.id,
        },
      });

      await Team.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  }
}

export default new TeamController();
