import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/authConfig';
import ApiError from '../../config/ApiError';
import Mentor from '../models/Mentor';
import Hackathon from '../models/Hackathon';
import User from '../models/User';
import InviteMentorMail from '../jobs/InviteMentorMail';
import NewMentorMail from '../jobs/newMentorMail';

import Queue from '../../lib/Queue';

class InviteMentorController {
  async store(req, res, next) {
    try {
      const { id } = req.params;
      const { emails } = req.body;

      const invitedUsers = await Promise.all(
        emails.map(async email => {
          const user = await User.findOne({ where: { email } });

          if (!user)
            throw new ApiError(
              'User not found',
              `No user found with email ${emails}`,
              400
            );

          return user;
        })
      );

      const hackathon = await Hackathon.findByPk(id);

      if (!hackathon)
        throw new ApiError(
          'Hackathon not found',
          'The Hackathon was not found',
          400
        );

      await Promise.all(
        invitedUsers.map(async invitedUser => {
          const mentor = await Mentor.findOne({
            where: { user_id: invitedUser.id, hackathon_id: id },
          });

          if (mentor)
            throw new ApiError(
              'Already mentor',
              `The user with email ${invitedUser.email} is already a mentor`,
              400
            );

          if (req.userId === invitedUser.id)
            throw new ApiError(
              "Can't invite yourself",
              'You are trying to invite yourself',
              400
            );

          const token = await jwt.sign(
            { user: invitedUser.id },
            authConfig.secret,
            {
              expiresIn: '7d',
            }
          );

          await Queue.add(InviteMentorMail.key, {
            user: invitedUser,
            hackathon,
            token,
          });
        })
      );

      return res.status(201).end();
    } catch (error) {
      return next(error);
    }
  }

  async show(req, res, next) {
    try {
      const { token, id } = req.params;

      const hackathon = Hackathon.findByPk(id);

      if (!hackathon)
        return res
          .status(301)
          .redirect(`${process.env.WEB_URL}/internal-error`);

      const decoded = await promisify(jwt.verify)(
        token,
        authConfig.secret
      ).catch(() => {
        return res
          .status(301)
          .redirect(`${process.env.WEB_URL}/internal-error`);
      });

      const user = await User.findByPk(decoded.user, {
        attributes: ['id', 'name', 'is_mentor'],
      });

      await user.update({
        is_mentor: true,
      });

      await Queue.add(NewMentorMail.key, {
        user,
        hackathon,
      });

      return res.status(301).redirect(`${process.env.WEB_URL}/app/calendly`);
    } catch (error) {
      return next(error);
    }
  }
}

export default new InviteMentorController();
