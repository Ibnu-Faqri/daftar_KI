'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class daftar_riwayat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      daftar_riwayat.belongsTo(models.ajuan, {
        foreignKey: 'ajuanId'
      });
    }
  }
  daftar_riwayat.init({
    ajuanId: DataTypes.INTEGER,
    TMT_Awal: DataTypes.DATE,
    TMT_Akhir: DataTypes.DATE,
    GAPOK: DataTypes.INTEGER,
    KD_Pangkat: DataTypes.STRING,
    Persentasi: DataTypes.STRING,
    Suskel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'daftar_riwayat',
  });
  return daftar_riwayat;
};