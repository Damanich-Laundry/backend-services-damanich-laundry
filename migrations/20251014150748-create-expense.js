"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("expenses", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      expense_date: { type: Sequelize.DATE, allowNull: false },
      category: { type: Sequelize.STRING },
      description: { type: Sequelize.TEXT },
      amount: { type: Sequelize.FLOAT, allowNull: false },
      payment_method: { type: Sequelize.STRING },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("expenses");
  },
};
