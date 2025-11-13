"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("customers", [
      {
        name: "John Doe",
        phone: "081234567890",
        email: "john.doe@example.com",
        address: "Jl. Merdeka No. 1, Jakarta",
        member_since: new Date("2022-01-01"),
        total_orders: 5,
        loyalty_points: 100,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Jane Smith",
        phone: "082233445566",
        email: "jane.smith@example.com",
        address: "Jl. Sudirman No. 45, Bandung",
        member_since: new Date("2023-03-15"),
        total_orders: 2,
        loyalty_points: 40,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Michael Tan",
        phone: "081998877665",
        email: "michael.tan@example.com",
        address: "Jl. Diponegoro No. 88, Surabaya",
        member_since: new Date("2021-06-10"),
        total_orders: 8,
        loyalty_points: 160,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Siti Nurhaliza",
        phone: "081311223344",
        email: "siti.nurhaliza@example.com",
        address: "Jl. Ahmad Yani No. 5, Yogyakarta",
        member_since: new Date("2020-10-20"),
        total_orders: 10,
        loyalty_points: 200,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Andi Pratama",
        phone: "085612345678",
        email: "andi.pratama@example.com",
        address: "Jl. Gatot Subroto No. 12, Medan",
        member_since: new Date("2023-05-01"),
        total_orders: 1,
        loyalty_points: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("customers", null, {});
  },
};
