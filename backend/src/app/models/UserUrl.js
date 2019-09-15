import { Model, Sequelize } from 'sequelize';

class UserUrl extends Model {
  static init(sequelize) {
    super.init(
      {
        url: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsToMany(models.User, {
      through: 'PivotUrl',
      as: 'users',
      foreignKey: 'user_url_id',
    });
  }
}

export default UserUrl;
