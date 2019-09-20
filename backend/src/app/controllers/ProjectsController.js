import TeamProject from '../models/TeamProject';
import ApiError from '../../config/ApiError';
import Project from '../models/Project';
import Team from '../models/Team';

class ProjectsController {
  async store(req, res, next) {
    try {
      const { id } = req.params;

      const isCreator = await Team.findOne({
        where: {
          creator_id: req.userId,
        },
      });

      if (!isCreator) {
        throw new ApiError(
          'Not Authorized',
          'It is only possible to create a project in a team that you the creator',
          401
        );
      }

      const team = await Team.findOne({
        where: {
          id,
        },
      });

      if (!team) {
        throw new ApiError('Not Found', 'Not found team', 404);
      }

      const existsProjects = await TeamProject.findOne({
        where: {
          team_id: id,
        },
      });

      if (existsProjects) {
        throw new ApiError(
          'Not Authorized',
          'You can only create one project per team.',
          401
        );
      }

      const project = await Project.create(req.body);

      await TeamProject.create({
        team_id: id,
        project_id: project.id,
      });

      return res.status(201).json(project);
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;

      const project = await Project.findByPk(id, {
        include: [
          {
            model: Team,
            as: 'projects',
            through: { attributes: [] },
            attributes: ['id', 'creator_id'],
            where: {
              creator_id: req.userId,
            },
          },
        ],
      });

      if (!project) {
        throw new ApiError('Not Found', 'Not found project', 404);
      }

      await project.update(req.body);

      return res.json(project);
    } catch (error) {
      return next(error);
    }
  }

  async show(req, res, next) {
    try {
      const { id } = req.params;

      const project = await Project.findByPk(id);

      if (!project) {
        throw new ApiError('Not Found', 'Not found project', 404);
      }

      return res.json(project);
    } catch (error) {
      return next(error);
    }
  }
}

export default new ProjectsController();
