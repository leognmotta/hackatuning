module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('teams', {
      creator_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allownull: true,
      },
      hackathon_id: {
        type: Sequelize.INTEGER,
        references: { model: 'hackathons', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allownull: true,
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
    return queryInterface.dropTable('teams');
  },
};
