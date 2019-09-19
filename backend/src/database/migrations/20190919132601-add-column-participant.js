module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('participants', 'team_member_id', {
      type: Sequelize.INTEGER,
      references: { model: 'team_members', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allownull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('participants', 'team_member_id');
  },
};
