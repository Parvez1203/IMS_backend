'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class production_orders extends Model {
    static associate(models) {
      // Each production order belongs to a product
      production_orders.belongsTo(models.product, {
        foreignKey: 'product_id',
        as: 'product'
      });

      // Each production order is linked to a stock entry
      production_orders.belongsTo(models.stock_entries, {
        foreignKey: 'stock_entry_id',
        as: 'stockEntry'
      });
    }
  }

  production_orders.init({
    style_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    notes: DataTypes.TEXT,
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stock_entry_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity_used: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'production_orders',
    tableName: 'production_orders'
  });

  return production_orders;
};
