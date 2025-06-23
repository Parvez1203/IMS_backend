'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  unique_employee_id: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  position: Sequelize.STRING,
  department: Sequelize.STRING,
  joining_date: Sequelize.DATE,
  is_active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  created_at: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updated_at: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
});

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};