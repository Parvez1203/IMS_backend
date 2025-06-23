'use strict';
module.exports = (sequelize, DataTypes) => {
  const stock_entries = sequelize.define('stock_entries', {
    product_id: DataTypes.INTEGER,
    entry_date: DataTypes.DATE,
    opening_quantity: DataTypes.INTEGER,
    closing_balance: DataTypes.INTEGER
  }, {});

  stock_entries.associate = function(models) {
    stock_entries.belongsTo(models.products, {
      foreignKey: 'product_id',
      as: 'product'
    });
  };

  return stock_entries;
};
