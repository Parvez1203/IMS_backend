'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   static associate(models) {
    Product.belongsTo(models.units, {
    foreignKey: 'unit_id',
    as: 'unit'
  });
}

  }
  Product.init({
    name: DataTypes.STRING,
    // cloth_size_id: DataTypes.INTEGER,
    // category_id: DataTypes.INTEGER,
    unit_id: DataTypes.INTEGER,
    remarks: DataTypes.TEXT,
    stock_threshold: DataTypes.INTEGER,
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};