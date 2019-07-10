'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('ALTER SEQUENCE "Book_id_seq" RESTART WITH 16')
  },

  down: (queryInterface, Sequelize) => {
  }
};
