import Sequelize, { Model } from 'sequelize';

class TeamMember extends Model {
  static init(sequelize) {
    super.init(
      {
        is_member: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Team, {
      foreignKey: 'team_id',
      as: 'team',
    });

    this.belongsTo(models.User, { foreignKey: 'member_id', as: 'member' });
  }
}

export default TeamMember;
