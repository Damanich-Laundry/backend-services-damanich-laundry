const inventoryRepository = require("../repositories/inventoryRepository");
const {
    createInventorySchema,
    updateInventorySchema,
    createInventoryLogSchema,
} = require("../validations/inventoryValidation");
const {handleJoiErrorMessage} = require("../utils/general");
const validator = require("./validationUsecase");
const {NotFoundError} = require("../exceptions/errors"); // instance

class inventoryUsecase {
    constructor() {
        this.validator = validator;
    }

    async getAllInventory() {
        return await inventoryRepository.findAll();
    }

    async getInventoryById(id) {
        const inventory = await inventoryRepository.findById(id);
        if (!inventory) throw new NotFoundError("Customer not found");
        return inventory;
    }

    async createInventory(data) {
        const value = this.validator.validateSchema(createInventorySchema, data);

        return await inventoryRepository.create(value);
    }

    async updateInventory(id, data) {
        const {error, value} = updateInventorySchema.validate(data);
        if (error) {
            throw handleJoiErrorMessage(error);
        }
        return await inventoryRepository.update(id, value);
    }

    async deleteInventory(id) {
        return await inventoryRepository.delete(id);
    }

    async createRestock(id, data) {
        const {error, value} = createInventoryLogSchema.validate(data);
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

module.exports = new inventoryUsecase();
