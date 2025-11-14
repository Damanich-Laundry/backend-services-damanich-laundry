'use strict';
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const hashedPassword = await bcrypt.hash("password123", 10);

        await queryInterface.bulkInsert("users", [
            {
                username: "admin",
                email: "admin@example.com",
                password_hash: hashedPassword,
                full_name: "Administrator",
                role: "admin",
                phone: "08123456789",
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", null, {});
    },
};
