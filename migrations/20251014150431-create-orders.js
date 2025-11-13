"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      order_number: { type: Sequelize.STRING, allowNull: false, unique: true },
      customer_id: {
        type: Sequelize.INTEGER,
        references: { model: "customers", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      order_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      estimated_done: { type: Sequelize.DATE },
      actual_done: { type: Sequelize.DATE },
      pickup_date: { type: Sequelize.DATE },
      status: {
        type: Sequelize.ENUM("RECEIVED", "PROCESSING", "DONE", "CANCELLED"),
        defaultValue: "RECEIVED",
      },
      payment_status: {
        type: Sequelize.ENUM("UNPAID", "PENDING", "PAID", "FAILED"),
        defaultValue: "UNPAID",
      },
      payment_method: { type: Sequelize.STRING },
      total_weight: { type: Sequelize.FLOAT, defaultValue: 0 },
      subtotal: { type: Sequelize.FLOAT, defaultValue: 0 },
      discount: { type: Sequelize.FLOAT, defaultValue: 0 },
      total_amount: { type: Sequelize.FLOAT, defaultValue: 0 },
      notes: { type: Sequelize.TEXT },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("orders");
  },
};
