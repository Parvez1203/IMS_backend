'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    unique_employee_id: DataTypes.STRING,
    position: DataTypes.STRING,
    department: DataTypes.STRING,
    joining_date: DataTypes.DATE,
    is_active: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return User;
};