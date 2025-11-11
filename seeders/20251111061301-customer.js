"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "customers",
      [
        {
          name: "customer test",
          phone: "081234567890",
          email: "costomertest@gmail.com",
          address: "Jl. Mawar No. 123, Jakarta",
          member_since: new Date("2020-01-15"),
          total_orders: 5,
          loyalty_points: 120,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "customers",
      { email: "costomertest@gmail.com" },
      {}
    );
  },
};
