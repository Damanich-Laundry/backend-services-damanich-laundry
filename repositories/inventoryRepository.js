const { Inventory, InventoryLog, sequelize } = require("../models");
const { Op } = require("sequelize");

class inventoryRepository {
  async findAll() {
    return await Inventory.findAll();
  }

  async findById(id) {
    return await Inventory.findByPk(id);
  }

  async create(data) {
    return await Inventory.create(data);
  }

  async update(id, data) {
    const inventory = await Inventory.findByPk(id);
    if (!inventory) return null;
    await inventory.update(data);
    return inventory;
  }

  async delete(id) {
    const inventory = await Inventory.findByPk(id);
    if (!inventory) return null;
    await inventory.destroy();
    return inventory;
  }

  /**
   * Buat log restock atau pemakaian bahan
   * Bisa dipanggil dari:
   * - endpoint manual `/api/inventory/:id/restock`
   * - orderRepository (otomatis saat create order)
   */
  async createRestock(id, data, options = {}) {
    const t = options.transaction || (await sequelize.transaction());
    try {
      const inventory = await Inventory.findByPk(id, { transaction: t });
      if (!inventory) throw new Error(`Inventory not found (id: ${id})`);

      const { type = "OUT", quantity, notes, order_id = null } = data;
      const finalType = type.toUpperCase();

      // 🧾 Buat log stok
      const inventoryLog = await InventoryLog.create(
        {
          inventory_id: id,
          order_id,
          type: finalType,
          quantity,
          notes,
        },
        { transaction: t }
      );

      // 🔁 Update stok fisik
      if (finalType === "IN") {
        await inventory.increment("quantity", { by: quantity, transaction: t });
      } else {
        await inventory.decrement("quantity", { by: quantity, transaction: t });
      }

      // 🕒 Update tanggal restock terakhir
      await inventory.update({ last_restock: new Date() }, { transaction: t });

      if (!options.transaction) await t.commit();
      return inventoryLog;
    } catch (error) {
      if (!options.transaction) await t.rollback();
      throw error;
    }
  }

  async findLowStock() {
    return await Inventory.findAll({
      where: {
        quantity: { [Op.lt]: 5 },
      },
    });
  }

  async findInventoryLogs(id) {
    return await InventoryLog.findAll({
      where: { inventory_id: id },
    });
  }
}

module.exports = new inventoryRepository();
