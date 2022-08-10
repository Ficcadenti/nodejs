"use strict";

const faker = require("faker");
faker.locale = "it";

module.exports = {
  async up(queryInterface, Sequelize) {
    let listData = [];
    for (let i = 1; i <= 10; i++) {
      for (let j = 0; j < 10; j++) {
        listData.push({
          name: faker.lorem.sentence(),
          user_id: i,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }
    await queryInterface.bulkInsert("lists", listData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("lists", null, {});
  },
};
