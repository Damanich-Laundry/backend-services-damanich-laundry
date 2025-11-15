"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("inventory", [
      {
        item_name: "Deterjen Cair",
        category: "Bahan Cuci",
        quantity: 50,
        unit: "liter",
        min_stock: 10,
        price_per_unit: 15000,
        supplier: "PT Bersih Jaya",
        last_restock: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "Pewangi Pakaian",
        category: "Bahan Cuci",
        quantity: 30,
        unit: "liter",
        min_stock: 5,
        price_per_unit: 20000,
        supplier: "CV Harum Abadi",
        last_restock: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "Plastik Laundry",
        category: "Perlengkapan",
        quantity: 200,
        unit: "pcs",
        min_stock: 50,
        price_per_unit: 500,
        supplier: "Toko Plastik Makmur",
        last_restock: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "Tag Nota",
        category: "Perlengkapan",
        quantity: 500,
        unit: "pcs",
        min_stock: 100,
        price_per_unit: 300,
        supplier: "Percetakan IndoPrint",
        last_restock: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_name: "Pelicin Pakaian",
        category: "Bahan Setrika",
        quantity: 15,
        unit: "liter",
        min_stock: 5,
        price_per_unit: 25000,
        supplier: "Aroma Wangi Supplier",
        last_restock: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("inventory", null, {});
  },
};
