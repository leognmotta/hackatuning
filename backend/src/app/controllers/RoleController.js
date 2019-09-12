import Role from '../models/Role';

class RoleController {
  async index(req, res, next) {
    try {
      const roles = await Role.findAll({
        attributes: ['id', 'name'],
        order: [['name', 'ASC']],
      });

      return res.json(roles);
    } catch (error) {
      return next(error);
    }
  }
}

export default new RoleController();
