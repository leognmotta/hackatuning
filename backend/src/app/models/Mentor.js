import Sequelize, { Model } from 'sequelize';

class Mentor extends Model {
  static init(sequelize) {
    super.init(
      {
        userId: Sequelize.INTEGER,
        hackathon_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Hackathon, {
      foreignKey: 'hackathon_id',
      as: 'hackathon',
    });

    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'mentor' });
  }
}

export default Mentor;
