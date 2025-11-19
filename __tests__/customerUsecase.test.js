const CustomerUsecase = require("../usecases/customerUsecase");
const customerRepository = require("../repositories/customerRepository");
const {NotFoundError} = require("../exceptions/errors");
const test = require("node:test");

// Mock validator
const validator = {
    validateSchema: jest.fn()
};

// Mock repository
jest.mock("../repositories/customerRepository");

describe("CustomerUsecase", () => {
    const usecase = new CustomerUsecase({validator});

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ---------------------------------------------------------
    // GET ALL
    // ---------------------------------------------------------
    test("getAllCustomers should return all customers", async () => {
        const fakeCustomers = [{id: 1}, {id: 2}];
        customerRepository.findAll.mockResolvedValue(fakeCustomers);

        const result = await usecase.getAllCustomers();

        expect(customerRepository.findAll).toHaveBeenCalled();
        expect(result).toEqual(fakeCustomers);
    });

    // ---------------------------------------------------------
    // GET BY ID
    // ---------------------------------------------------------
    test("getCustomerById should return customer if found", async () => {
        const fakeCustomer = {id: 5, name: "John"};
        customerRepository.findById.mockResolvedValue(fakeCustomer);

        const result = await usecase.getCustomerById(5);

        expect(customerRepository.findById).toHaveBeenCalledWith(5);
        expect(result).toEqual(fakeCustomer);
    });

    test("getCustomerById should throw NotFoundError if not found", async () => {
        customerRepository.findById.mockResolvedValue(null);

        await expect(usecase.getCustomerById(99)).rejects.toThrow(NotFoundError);
    });

    // ---------------------------------------------------------
    // CREATE CUSTOMER
    // ---------------------------------------------------------
    test("createCustomer should validate and create customer", async () => {
        const payload = {name: "John", phone: "123"};
        const validated = {name: "John", phone: "123"};

        validator.validateSchema.mockReturnValue(validated);
        customerRepository.create.mockResolvedValue(validated);

        const result = await usecase.createCustomer(payload);

        expect(validator.validateSchema).toHaveBeenCalled();
        expect(customerRepository.create).toHaveBeenCalledWith(validated);
        expect(result).toEqual(validated);
    });

    // ---------------------------------------------------------
    // UPDATE CUSTOMER
    // ---------------------------------------------------------
    test("updateCustomer should update and return updated data", async () => {
        const updated = {id: 3, name: "Updated"};

        // Mock Joi validation
        const updateCustomerSchema = require("../validations/customerValidation").updateCustomerSchema;
        jest.spyOn(updateCustomerSchema, "validate").mockReturnValue({value: updated});

        customerRepository.update.mockResolvedValue(updated);

        const result = await usecase.updateCustomer(3, updated);

        expect(customerRepository.update).toHaveBeenCalledWith(3, updated);
        expect(result).toEqual(updated);
    });

    test("updateCustomer should throw NotFoundError if update fails", async () => {
        const updateCustomerSchema = require("../validations/customerValidation").updateCustomerSchema;
        jest.spyOn(updateCustomerSchema, "validate").mockReturnValue({value: {}});

        customerRepository.update.mockResolvedValue(null);

        await expect(usecase.updateCustomer(10, {})).rejects.toThrow(NotFoundError);
    });

    // ---------------------------------------------------------
    // DELETE CUSTOMER
    // ---------------------------------------------------------
    test("deleteCustomer should delete and return deleted result", async () => {
        customerRepository.delete.mockResolvedValue(true);

        const result = await usecase.deleteCustomer(4);

        expect(customerRepository.delete).toHaveBeenCalledWith(4);
        expect(result).toBe(true);
    });

    test("deleteCustomer should throw NotFoundError if not found", async () => {
        customerRepository.delete.mockResolvedValue(null);

        await expect(usecase.deleteCustomer(50)).rejects.toThrow(NotFoundError);
    });
});
