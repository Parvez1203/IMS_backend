'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cloth_size_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'cloth_sizes',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  category_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'product_categories',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  unit_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'units',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  remarks: {
    type: Sequelize.TEXT
  },
  stock_threshold: {
    type: Sequelize.INTEGER,
    defaultValue: 100
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()')
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()')
  }
});

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};