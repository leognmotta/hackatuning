import { Model } from 'sequelize';

class TeamProject extends Model {
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
    this.belongsTo(models.Team, { foreignKey: 'team_id' });
    this.belongsTo(models.Project, { foreignKey: 'project_id' });
  }
}

export default TeamProject;
