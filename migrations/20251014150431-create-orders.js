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
      order_date: { type: Sequelize.DATE, allowNull: false },
      estimated_done: { type: Sequelize.DATE },
      actual_done: { type: Sequelize.DATE },
      pickup_date: { type: Sequelize.DATE },
      status: { type: Sequelize.STRING },
      payment_status: { type: Sequelize.STRING },
      payment_method: { type: Sequelize.STRING },
      total_weight: { type: Sequelize.FLOAT },
      subtotal: { type: Sequelize.FLOAT },
      discount: { type: Sequelize.FLOAT },
      total_amount: { type: Sequelize.FLOAT },
      notes: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("orders");
  },
};
