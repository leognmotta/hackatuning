import User from '../models/User';

class ValidateTokenController {
  async index(req, res, next) {
    try {
      const { id, name } = await User.findByPk(req.userId);

      return res.json({ id, name });
    } catch (error) {
      return next(error);
    }
  }
}

export default new ValidateTokenController();
