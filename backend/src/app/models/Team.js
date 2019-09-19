import { Model } from 'sequelize';

class Team extends Model {
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

    this.belongsTo(models.User, { foreignKey: 'creator_id', as: 'creator' });

    this.belongsToMany(models.User, {
      through: 'TeamMember',
      as: 'members',
      foreignKey: 'team_id',
    });
  }
}

export default Team;
