"use strict";

const bcrypt = require("bcrypt");
const faker = require("faker");
faker.locale = "it";

module.exports = {
  async up(queryInterface, Sequelize) {
    let userData = [];
    for (let i = 0; i < 10; i++) {
      userData.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync("raffaele", 10),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("users", userData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
