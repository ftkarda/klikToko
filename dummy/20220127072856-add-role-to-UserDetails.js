'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.addColumn('UserDetails', 'role', {type: Sequelize.STRING})
  },

  down (queryInterface, Sequelize) {
    return queryInterface.dropTable('UserDetails', 'role');
  }
};
