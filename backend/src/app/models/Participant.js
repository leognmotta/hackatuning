import { Model } from 'sequelize';

class Participant extends Model {
  static init(sequelize) {
    super.init(
      {},
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

    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'participant' });
  }
}

export default Participant;
