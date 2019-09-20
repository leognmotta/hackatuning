module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('team_projects', {
      team_id: {
        type: Sequelize.INTEGER,
        references: { model: 'teams', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allownull: false,
      },
      project_id: {
        type: Sequelize.INTEGER,
        references: { model: 'projects', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allownull: false,
      },
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('team_projects');
  },
};
