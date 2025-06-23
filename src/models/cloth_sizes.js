'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cloth_sizes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cloth_sizes.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cloth_sizes',
  });
  return cloth_sizes;
};