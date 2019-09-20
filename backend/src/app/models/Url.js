import { Model, Sequelize } from 'sequelize';

class Url extends Model {
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
    this.belongsToMany(models.User, {
      through: 'UserUrl',
      as: 'users',
      foreignKey: 'id',
    });
  }
}

export default Url;
