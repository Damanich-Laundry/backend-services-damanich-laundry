"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("customers", {
            id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
            name: {type: Sequelize.STRING, allowNull: false},
            phone: {type: Sequelize.STRING},
            email: {type: Sequelize.STRING},
            address: {type: Sequelize.TEXT},
            member_since: {type: Sequelize.DATE},
            total_orders: {type: Sequelize.INTEGER, defaultValue: 0},
            loyalty_points: {type: Sequelize.INTEGER, defaultValue: 0},
            created_at: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW},
            updated_at: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW},
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable("customers");
    },
};
