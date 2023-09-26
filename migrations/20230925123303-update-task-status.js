'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Tasks', 'status', {
      type: Sequelize.ENUM('open', 'inprogress', 'completed'),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Tasks', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};

