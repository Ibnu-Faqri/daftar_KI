'use strict';
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const hashpass = await bcrypt.hash("admin123",10);
    await queryInterface.bulkInsert('Users', 
    [
      {
        name: "budi",
        email: "budi123@gmail.com",
        password: hashpass,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "rian",
        email: "rian1945@gmail.com",
        password: hashpass,
        role: "kepala",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },
  

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
