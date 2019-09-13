module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'confirm_email', {
        type: Sequelize.BOOLEAN,
        default: false,
      }),
      queryInterface.addColumn('users', 'confirm_email_token', {
        type: Sequelize.TEXT,
      }),
      queryInterface.addColumn('users', 'recover_pass_token', {
        type: Sequelize.TEXT,
      }),
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('users', 'confirm_email'),
      queryInterface.removeColumn('users', 'confirm_email_token'),
      queryInterface.removeColumn('users', 'recover_pass_token'),
    ]);
  },
};
