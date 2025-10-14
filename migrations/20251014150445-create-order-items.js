"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("order_items", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      order_id: {
        type: Sequelize.INTEGER,
        references: { model: "orders", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      service_id: {
        type: Sequelize.INTEGER,
        references: { model: "services", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      unit_price: { type: Sequelize.FLOAT, allowNull: false },
      subtotal: { type: Sequelize.FLOAT },
      notes: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("order_items");
  },
};
