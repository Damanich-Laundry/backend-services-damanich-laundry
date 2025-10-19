"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("services", {
            id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
            service_name: {type: Sequelize.STRING, allowNull: false},
            service_type: {type: Sequelize.STRING},
            unit: {type: Sequelize.STRING},
            price_per_unit: {type: Sequelize.FLOAT},
            duration_hours: {type: Sequelize.FLOAT},
            is_active: {type: Sequelize.BOOLEAN, defaultValue: true},
            created_at: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW},
            updated_at: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW},
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable("services");
    },
};
