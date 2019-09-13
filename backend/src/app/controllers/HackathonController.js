import ApiError from '../../config/ApiError';
import Hackathon from '../models/Hackathon';

class HackathonController {
  async store(req, res, next) {
    try {
      req.body.organizer_id = req.userId;

      const hackathon = await Hackathon.create(req.body);

      return res.json(hackathon);
    } catch (error) {
      return next(error);
    }
  }

  async index() {}

  async show() {}

  async update() {}

  async delete() {}
}

export default new HackathonController();
