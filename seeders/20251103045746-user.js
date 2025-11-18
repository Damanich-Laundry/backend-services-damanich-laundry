"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordAdmin = await bcrypt.hash("admin123", 10);
    const passwordStaff = await bcrypt.hash("staff123", 10);

    await queryInterface.bulkInsert("users", [
      {
        username: "admin",
        email: "admin@gmail.com",
        password_hash: passwordAdmin,
        full_name: "Admin DM Laundry",
        role: "admin",
        phone: "081234567890",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "staff",
        email: "staff@gmail.com",
        password_hash: passwordStaff,
        full_name: "Staff DM Laundry",
        role: "staff",
        phone: "089876543210",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", {
      email: ["admin@gmail.com", "staff@gmail.com"],
    });
  },
};
