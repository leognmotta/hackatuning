import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        subtitle: Sequelize.STRING,
        description: Sequelize.TEXT,
        location: Sequelize.STRING,
        online: Sequelize.BOOLEAN,
        event_date: Sequelize.DATE,
        deadline_subscription: Sequelize.DATE,
        awards: Sequelize.TEXT,
        min_participants: Sequelize.INTEGER,
        max_participants: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'cover_id', as: 'cover' });
    this.belongsTo(models.User, {
      foreignKey: 'organizer_id',
      as: 'organizer',
    });
  }
}

export default User;
