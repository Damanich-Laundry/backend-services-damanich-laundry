const inventoryUsecase = require("../usecases/inventoryUsecase");
const inventoryRepository = require("../repositories/inventoryRepository");
const {
    createInventorySchema,
    updateInventorySchema,
    createInventoryLogSchema,
} = require("../validations/inventoryValidation");
const {NotFoundError} = require("../exceptions/errors");

// Mock repository
jest.mock("../repositories/inventoryRepository");

// Mock validator instance
const validator = require("../usecases/validationUsecase");
jest.mock("../usecases/validationUsecase");

// Mock Joi schemas
jest.mock("../validations/inventoryValidation");

describe("InventoryUsecase", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // --------------------------------------------------------------------
    // GET ALL INVENTORY
    // --------------------------------------------------------------------
    test("getAllInventory should return all inventory items", async () => {
        const fakeData = [{id: 1}, {id: 2}];
        inventoryRepository.findAll.mockResolvedValue(fakeData);

        const result = await inventoryUsecase.getAllInventory();

        expect(inventoryRepository.findAll).toHaveBeenCalled();
        expect(result).toEqual(fakeData);
    });

    // --------------------------------------------------------------------
    // GET INVENTORY BY ID
    // --------------------------------------------------------------------
    test("getInventoryById should return inventory if exists", async () => {
        const fakeInv = {id: 10, name: "Detergent"};
        inventoryRepository.findById.mockResolvedValue(fakeInv);

        const result = await inventoryUsecase.getInventoryById(10);

        expect(inventoryRepository.findById).toHaveBeenCalledWith(10);
        expect(result).toEqual(fakeInv);
    });

    test("getInventoryById should throw NotFoundError if no data", async () => {
        inventoryRepository.findById.mockResolvedValue(null);

        await expect(inventoryUsecase.getInventoryById(77))
            .rejects
            .toThrow(NotFoundError);
    });

    // --------------------------------------------------------------------
    // CREATE INVENTORY
    // --------------------------------------------------------------------
    test("createInventory should validate and create inventory", async () => {
        const payload = {name: "Softener", stock: 50};
        const validated = {name: "Softener", stock: 50};

        // mock validator
        validator.validateSchema.mockReturnValue(validated);

        inventoryRepository.create.mockResolvedValue(validated);

        const result = await inventoryUsecase.createInventory(payload);

        expect(validator.validateSchema).toHaveBeenCalledWith(createInventorySchema, payload);
        expect(inventoryRepository.create).toHaveBeenCalledWith(validated);
        expect(result).toEqual(validated);
    });

    // --------------------------------------------------------------------
    // UPDATE INVENTORY
    // --------------------------------------------------------------------
    test("updateInventory should validate and update inventory", async () => {
        const updated = {name: "Updated Item", stock: 100};

        updateInventorySchema.validate = jest.fn().mockReturnValue({value: updated});

        inventoryRepository.update.mockResolvedValue(updated);

        const result = await inventoryUsecase.updateInventory(3, updated);

        expect(updateInventorySchema.validate).toHaveBeenCalled();
        expect(inventoryRepository.update).toHaveBeenCalledWith(3, updated);
        expect(result).toEqual(updated);
    });

    test("updateInventory should throw error if validation fails", async () => {
        updateInventorySchema.validate = jest.fn().mockReturnValue({
            error: {message: "Validation error"}
        });

        await expect(inventoryUsecase.updateInventory(1, {})).rejects.toThrow();
    });

    // --------------------------------------------------------------------
    // DELETE INVENTORY
    // --------------------------------------------------------------------
    test("deleteInventory should call repository delete", async () => {
        inventoryRepository.delete.mockResolvedValue(true);

        const result = await inventoryUsecase.deleteInventory(5);

        expect(inventoryRepository.delete).toHaveBeenCalledWith(5);
        expect(result).toBe(true);
    });

    // --------------------------------------------------------------------
    // CREATE RESTOCK
    // --------------------------------------------------------------------
    test("createRestock should validate and insert restock log", async () => {
        const payload = {qty: 10};
        const validated = {qty: 10};
        const restockResult = {id: 1, qty: 10};

        createInventoryLogSchema.validate = jest.fn().mockReturnValue({value: validated});

        inventoryRepository.createRestock.mockResolvedValue(restockResult);

        const result = await inventoryUsecase.createRestock(88, payload);

        expect(createInventoryLogSchema.validate).toHaveBeenCalledWith(payload);
        expect(inventoryRepository.createRestock).toHaveBeenCalledWith(88, validated);
        expect(result).toEqual(restockResult);
    });

    test("createRestock should throw error if validation fails", async () => {
        createInventoryLogSchema.validate = jest.fn().mockReturnValue({
            error: {message: "Validation failed"}
        });

        await expect(inventoryUsecase.createRestock(1, {})).rejects.toThrow();
    });

    // --------------------------------------------------------------------
    // GET LOW STOCK
    // --------------------------------------------------------------------
    test("getLowStock should return low-stock items", async () => {
        const lowStockItems = [{id: 1}, {id: 3}];
        inventoryRepository.findLowStock.mockResolvedValue(lowStockItems);

        const result = await inventoryUsecase.getLowStock();

        expect(inventoryRepository.findLowStock).toHaveBeenCalled();
        expect(result).toEqual(lowStockItems);
    });

    // --------------------------------------------------------------------
    // GET INVENTORY LOGS
    // --------------------------------------------------------------------
    test("getInventoryLogs should return all logs", async () => {
        const logs = [{id: 1}, {id: 2}];
        inventoryRepository.findInventoryLogs.mockResolvedValue(logs);

        const result = await inventoryUsecase.getInventoryLogs(12);

        expect(inventoryRepository.findInventoryLogs).toHaveBeenCalledWith(12);
        expect(result).toEqual(logs);
    });
});
