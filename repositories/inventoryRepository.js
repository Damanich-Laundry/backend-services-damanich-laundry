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
    const dateUpdate = new Date();
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

  async createRestock(id, data) {
    let t;
    try {
      t = await sequelize.transaction();
      let { type, quantity, notes } = data;
      const inventoryId = id;
      type = type.toUpperCase();

      const inventory = await Inventory.findByPk(inventoryId, {
        transaction: t,
      });
      if (!inventory) {
        await t.rollback();
        return null;
      }
      const inventoryLog = await InventoryLog.create(
        {
          inventory_id: inventoryId,
          type: type,
          quantity: quantity,
          notes: notes,
        },
        { transaction: t }
      );

      if (type.toUpperCase() === "IN") {
        await inventory.increment("quantity", { by: quantity, transaction: t });
      } else {
        await inventory.decrement("quantity", { by: quantity, transaction: t });
      }

      await inventory.update(
        {
          last_restock: new Date(),
        },
        { transaction: t }
      );

      await t.commit();
      return inventoryLog;
    } catch (error) {
      if (t) await t.rollback();
      throw error;
    }
  }

  async findLowStock() {
    return await Inventory.findAll({
      where: {
        quantity: {
          [Op.lt]: 5,
        },
      },
    });
  }

  async findInventoryLogs(id) {
    return await InventoryLog.findAll({
      where: {
        inventory_id: id,
      },
    });
  }
}

module.exports = new inventoryRepository();
