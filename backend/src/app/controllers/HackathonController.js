import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import ApiError from '../../config/ApiError';
import File from '../models/File';
import User from '../models/User';
import Hackathon from '../models/Hackathon';
import Participant from '../models/Participant';
import authConfig from '../../config/authConfig';

import Queue from '../../lib/Queue';
import Notification from '../schemas/Notifications';
import HackathonCreationMail from '../jobs/HackathonCreationMail';
import HackathonUpdateMail from '../jobs/HackathonUpdateMail';
import HackathonDeleteMail from '../jobs/HackathonDeleteMail';

class HackathonController {
  async store(req, res, next) {
    try {
      req.body.organizer_id = req.userId;

      const hackathon = await Hackathon.create(req.body);

      const { name: organizer, email } = await User.findByPk(req.userId);
      const {
        title,
        event_date,
        event_ending,
        deadline_subscription,
        deadline_team_creation,
      } = hackathon;

      await Notification.create({
        content: `You have created ${hackathon.title}`,
        user: req.userId,
        url: `${process.env.WEB_URL}/hackathons/${hackathon.id}`,
      });

      await Queue.add(HackathonCreationMail.key, {
        organizer,
        email,
        title,
        event_date,
        event_ending,
        deadline_subscription,
        deadline_team_creation,
      });

      return res.json(hackathon);
    } catch (error) {
      return next(error);
    }
  }

  async index(req, res, next) {
    try {
      const { page = 1, perPage = 20 } = req.query;
      const { authorization: authHeader } = req.headers;

      if (authHeader) {
        const [, token] = authHeader.split(' ');

        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        req.userId = decoded.id;
      }

      const hackathons = await Hackathon.findAndCountAll({
        where: {
          event_date: {
            [Op.gt]: new Date(),
          },
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

      hackathons.rows.map(
        hackathon => (hackathon.dataValues.isParticipant = false)
      );

      if (req.userId) {
        await Promise.all(
          hackathons.rows.map(async hackthon => {
            const isParticipant = await Participant.findOne({
              where: {
                hackathon_id: hackthon.dataValues.id,
                user_id: req.userId,
              },
            });

            if (isParticipant) {
              hackthon.dataValues.isParticipant = true;
            } else {
              hackthon.dataValues.isParticipant = false;
            }
          })
        );
      }

      console.log(hackathons.rows[0].dataValues);

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

  async show(req, res, next) {
    try {
      const { id } = req.params;

      const hackathon = await Hackathon.findOne({
        where: { id },
        include: [
          {
            model: File,
            as: 'cover',
            attributes: ['id', 'url', 'path'],
          },
          {
            model: User,
            as: 'organizer',
            attributes: ['id', 'name', 'nickname'],
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

      if (!hackathon)
        throw new ApiError(
          'Not found',
          `The Hackathon event was not found with id: ${id}`,
          404
        );

      return res.json(hackathon);
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;

      const hackathon = await Hackathon.findByPk(id);

      if (!hackathon)
        throw new ApiError(
          'Not found',
          `The Hackathon event was not found with id: ${id}`,
          404
        );

      if (hackathon.organizer_id !== req.userId)
        throw new ApiError(
          'Unauthorized',
          `You need to own the event to update it.`,
          401
        );

      const { name: organizer, email } = await User.findByPk(req.userId);

      const {
        title,
        event_date,
        event_ending,
        deadline_subscription,
        deadline_team_creation,
      } = await hackathon.update(req.body);

      await Notification.create({
        content: `You have updated ${title}`,
        user: req.userId,
        url: `${process.env.WEB_URL}/hackathons/${id}`,
      });

      await Queue.add(HackathonUpdateMail.key, {
        organizer,
        email,
        title,
        event_date,
        event_ending,
        deadline_subscription,
        deadline_team_creation,
      });

      return res.json(hackathon);
    } catch (error) {
      return next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const { organizer_id, title } = await Hackathon.findByPk(id);

      if (organizer_id !== req.userId)
        throw new ApiError(
          'Unauthorized',
          `You need to own the event to update it.`,
          401
        );

      const { name: organizer, email } = await User.findByPk(req.userId);

      await Notification.create({
        content: `You have deleted ${title}`,
        user: req.userId,
        url: `${process.env.WEB_URL}/hackathons/${id}`,
      });

      await Queue.add(HackathonDeleteMail.key, {
        organizer,
        email,
        title,
      });

      Hackathon.destroy({ where: { id } });

      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
  }
}

export default new HackathonController();
