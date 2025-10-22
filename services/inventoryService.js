const inventoryRepository = require("../repositories/inventoryRepository");
const {
  createInventorySchema,
  updateInventorySchema,
  createInventoryLogSchema,
} = require("../validations/inventoryValidation");
const { handleJoiErrorMessage } = require("../utils/general");

class inventoryService {
  async getAllInventory() {
    const inventories = await inventoryRepository.findAll();
    return inventories;
  }

  async getInventoryById(id) {
    const inventory = await inventoryRepository.findById(id);
    return inventory;
  }

  async createInventory(data) {
    const { error, value } = createInventorySchema.validate(data);
    if (error) {
      throw handleJoiErrorMessage(error);
    }
    const inventory = await inventoryRepository.create(value);
    return inventory;
  }

  async updateInventory(id, data) {
    const { error, value } = updateInventorySchema.validate(data);
    if (error) {
      throw handleJoiErrorMessage(error);
    }
    const inventory = await inventoryRepository.update(id, value);
    return inventory;
  }

  async deleteInventory(id) {
    const inventory = await inventoryRepository.delete(id);
    return inventory;
  }

  async createRestock(id, data) {
    const { error, value } = createInventoryLogSchema.validate(data);
    if (error) {
      throw handleJoiErrorMessage(error);
    }
    const inventory = await inventoryRepository.createRestock(id, value);
    return inventory;
  }

  async getLowStock() {
    const inventory = await inventoryRepository.findLowStock();
    return inventory;
  }

  async getInventoryLogs(id) {
    const inventory = await inventoryRepository.findInventoryLogs(id);
    return inventory;
  }
}

module.exports = new inventoryService();
