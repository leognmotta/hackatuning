import { Model, Sequelize } from 'sequelize';

class Role extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: 'UserRole',
      as: 'roles',
      foreignKey: 'role_id',
    });
  }
}

export default Role;
