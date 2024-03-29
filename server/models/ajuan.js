'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ajuan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ajuan.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      ajuan.hasMany(models.daftar_riwayat, {
        foreignKey: 'ajuanId',
      });
    }
  }
  ajuan.init({
    userId: DataTypes.INTEGER,
    notas: DataTypes.INTEGER,
    nama_peserta: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ajuan',
  });
  return ajuan;
};