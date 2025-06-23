'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('production_orders', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  style_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  order_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  notes: {
    type: Sequelize.TEXT
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  stock_entry_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'stock_entries',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  quantity_used: {
    type: Sequelize.INTEGER,
    allowNull: false
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
    await queryInterface.dropTable('production_orders');
  }
};