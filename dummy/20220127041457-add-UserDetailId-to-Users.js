'use strict';

module.exports = {
   up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'UserDetailId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'UserDetails',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },

   down (queryInterface, Sequelize) {
    return queryInterface.dropTable('Users', 'UserDetailId');

  }
};
