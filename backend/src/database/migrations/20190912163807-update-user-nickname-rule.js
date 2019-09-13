module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('users', 'nickname', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('users', 'nickname', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
