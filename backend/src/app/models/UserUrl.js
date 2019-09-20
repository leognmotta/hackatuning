import Sequelize, { Model } from 'sequelize';

class UserUrl extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true, // Automatically gets converted to SERIAL for postgres
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Url, { foreignKey: 'url_id' });
  }
}

export default UserUrl;
