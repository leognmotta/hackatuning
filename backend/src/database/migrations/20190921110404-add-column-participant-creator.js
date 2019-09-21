module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('participants', 'team_creator_id', {
      type: Sequelize.INTEGER,
      references: { model: 'teams', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allownull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('participants', 'team_creator_id');
  },
};
