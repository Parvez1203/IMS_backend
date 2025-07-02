'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class stock_entries extends Model {
    static associate(models) {
      stock_entries.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product'
      });

      stock_entries.hasMany(models.production_orders, {
        foreignKey: 'stock_entry_id',
        as: 'productionOrders'
      });
    }
  }

  stock_entries.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    entry_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    opening_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    closing_balance: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, rate: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'stock_entries',
    tableName: 'stock_entries'
  });

  return stock_entries;
};
