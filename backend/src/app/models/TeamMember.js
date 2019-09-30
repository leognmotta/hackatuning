import Sequelize, { Model } from 'sequelize';

class TeamMember extends Model {
  static init(sequelize) {
    super.init(
      {
        is_member: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        team_id: {
          type: Sequelize.INTEGER,
          references: { model: 'teams', key: 'id' },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'member_id', as: 'member' });

    this.belongsTo(models.Team, {
      foreignKey: 'team_id',
      as: 'team',
    });
  }
}

export default TeamMember;
