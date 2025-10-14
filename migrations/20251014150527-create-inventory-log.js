"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("inventory_log", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      inventory_id: {
        type: Sequelize.INTEGER,
        references: { model: "inventory", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: { model: "orders", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      type: { type: Sequelize.STRING, allowNull: false },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      notes: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("inventory_log");
  },
};
