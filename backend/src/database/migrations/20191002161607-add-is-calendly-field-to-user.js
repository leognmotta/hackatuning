module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'calendly', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'calendly');
  },
};
