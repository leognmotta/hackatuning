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
  }
}

export default UserUrl;
