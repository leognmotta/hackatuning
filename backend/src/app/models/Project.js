import { Model, Sequelize } from 'sequelize';

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        url: Sequelize.STRING,
        description: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Team, {
      through: 'TeamProject',
      as: 'projects',
      foreignKey: 'project_id',
    });
  }
}

export default Project;
