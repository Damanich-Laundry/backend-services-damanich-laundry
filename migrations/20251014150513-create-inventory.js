"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("inventory", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      item_name: { type: Sequelize.STRING, allowNull: false },
      category: { type: Sequelize.STRING },
      quantity: { type: Sequelize.INTEGER, defaultValue: 0 },
      unit: { type: Sequelize.STRING },
      min_stock: { type: Sequelize.INTEGER, defaultValue: 0 },
      price_per_unit: { type: Sequelize.FLOAT },
      supplier: { type: Sequelize.STRING },
      last_restock: { type: Sequelize.DATE },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("inventory");
  },
};
