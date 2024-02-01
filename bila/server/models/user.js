'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.ajuan, { 
        foreignKey: 'userId' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "input tidak boleh string kosong"
        },
        len: [6, 20],
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "karyawan",
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, option) {
        user.password = bcrypt.hashSync(user.password, saltRounds);
      },
    },
  });
  return User;
};