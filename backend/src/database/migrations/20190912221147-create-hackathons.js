module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('hackathons', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cover_id: {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allownull: true,
        defaultValue: 1,
      },
      organizer_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allownull: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subtitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      online: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      event_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deadline_subscription: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      event_ending: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deadline_team_creation: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      awards: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      min_participants: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allownull: true,
      },
      max_participants: {
        type: Sequelize.INTEGER,
        defaultValue: 9999,
        allownull: true,
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
    return queryInterface.dropTable('hackathons');
  },
};
