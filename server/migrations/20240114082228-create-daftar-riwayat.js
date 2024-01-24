'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('daftar_riwayats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ajuanId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ajuans',
          key: 'id'
        },
      },
      TMT_Awal: {
        type: Sequelize.DATE
      },
      TMT_Akhir: {
        type: Sequelize.DATE
      },
      GAPOK: {
        type: Sequelize.INTEGER
      },
      KD_Pangkat: {
        type: Sequelize.STRING
      },
      Persentasi: {
        type: Sequelize.STRING
      },
      Suskel: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('daftar_riwayats');
  }
};