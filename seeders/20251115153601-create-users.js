"use strict";

const bcrypt = require("bcrypt");

module.exports = {
    async up(queryInterface, Sequelize) {
        const passwordAdmin = await bcrypt.hash("!AdminDamanichLaundry25", 10);
        const passwordUser = await bcrypt.hash("!StaffDamanichLaundry25", 10);

        await queryInterface.bulkInsert("users", [
            {
                username: "admin_damanich",
                email: "admin@damanich.laundry",
                password_hash: passwordAdmin,
                full_name: "Administrator Damanich Laundry",
                role: "admin",
                phone: "081234567890",
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                username: "staff_damanich",
                email: "staff@damanich.laundry",
                password_hash: passwordUser,
                full_name: "Staff Damanich Laundry",
                role: "staff",
                phone: "089876543210",
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", null, {});
    }
};