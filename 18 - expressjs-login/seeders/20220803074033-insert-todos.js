"use strict";
const faker = require("faker");
faker.locale = "it";

module.exports = {
  async up(queryInterface, Sequelize) {
    let todoData = [];
    for (let i = 1; i < 100; i++) {
      for (let j = 0; j < 10; j++) {
        todoData.push({
          todo: faker.lorem.sentence(),
          list_id: i,
          completed: faker.random.arrayElement([0, 1]),
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }
    await queryInterface.bulkInsert("todos", todoData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("todos", null, {});
  },
};
