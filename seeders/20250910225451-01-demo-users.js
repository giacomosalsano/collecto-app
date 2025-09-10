"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const rawPassword = "password";

    const hashedPassword = await bcrypt.hash(rawPassword, 8);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Domitila Rebeca",
          email: "domitila@email.com",
          password: hashedPassword,
          balance_in_cents: 1000000,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Giacomo",
          email: "giacomo@email.com",
          password: hashedPassword,
          balance_in_cents: 100000000,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Tom Builder",
          email: "tom@email.com",
          password: hashedPassword,
          balance_in_cents: 500000,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
