module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('team_members', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      is_member: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      member_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allownull: true,
      },
      team_id: {
        type: Sequelize.INTEGER,
        references: { model: 'teams', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allownull: true,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('team_members');
  },
};
