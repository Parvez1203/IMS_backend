'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cloth_sizes', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()'),
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()'),
  }
});

// Add CHECK constraint manually
await queryInterface.sequelize.query(`
  ALTER TABLE "cloth_sizes"
  ADD CONSTRAINT name_check CHECK (name IN ('S', 'M', 'L', 'XL', '2XL'));
`);

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cloth_sizes');
  }
};