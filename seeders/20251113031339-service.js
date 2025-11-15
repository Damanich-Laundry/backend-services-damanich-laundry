"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("services", [
      {
        service_name: "Cuci Kering",
        service_type: "Laundry",
        unit: "kg",
        price_per_unit: 8000,
        duration_hours: 24,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        service_name: "Cuci + Setrika",
        service_type: "Laundry",
        unit: "kg",
        price_per_unit: 10000,
        duration_hours: 48,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        service_name: "Setrika Saja",
        service_type: "Laundry",
        unit: "kg",
        price_per_unit: 7000,
        duration_hours: 24,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        service_name: "Dry Cleaning",
        service_type: "Premium",
        unit: "pcs",
        price_per_unit: 15000,
        duration_hours: 72,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        service_name: "Karpet Besar",
        service_type: "Household",
        unit: "m2",
        price_per_unit: 12000,
        duration_hours: 96,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("services", null, {});
  },
};
