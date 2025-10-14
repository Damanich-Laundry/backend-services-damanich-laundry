"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("system_settings", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      setting_key: { type: Sequelize.STRING, allowNull: false, unique: true },
      setting_value: { type: Sequelize.STRING },
      description: { type: Sequelize.TEXT },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("system_settings");
  },
};
