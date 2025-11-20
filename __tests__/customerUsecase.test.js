const CustomerUsecase = require("../usecases/customerUsecase");
const customerRepository = require("../repositories/customerRepository");
const {NotFoundError} = require("../exceptions/errors");

// Mock repository
jest.mock("../repositories/customerRepository");
const validatorMock = {validateSchema: jest.fn()};

describe("CustomerUsecase", () => {
    const usecase = new CustomerUsecase({validator: validatorMock});

    beforeEach(() => {
        jest.clearAllMocks();
        Object.defineProperty(usecase, "validator", {
            value: {validateSchema: jest.fn()},
            writable: true,
        });
    });

    // ----------------- GET ALL -----------------
    describe("getAllCustomers", () => {
        test("should return all customers", async () => {
            const fakeCustomers = [{id: 1}, {id: 2}];
            customerRepository.findAll.mockResolvedValue(fakeCustomers);

            const result = await usecase.getAllCustomers();

            expect(customerRepository.findAll).toHaveBeenCalled();
            expect(result).toEqual(fakeCustomers);
        });
    });

    // ----------------- GET BY ID -----------------
    describe("getCustomerById", () => {
        test("should return customer if found", async () => {
            const fakeCustomer = {id: 5, name: "John"};
            customerRepository.findById.mockResolvedValue(fakeCustomer);

            const result = await usecase.getCustomerById(5);

            expect(customerRepository.findById).toHaveBeenCalledWith(5);
            expect(result).toEqual(fakeCustomer);
        });

        test("should throw NotFoundError if not found", async () => {
            customerRepository.findById.mockResolvedValue(null);
            await expect(usecase.getCustomerById(99)).rejects.toThrow(NotFoundError);
        });
    });

    // ----------------- CREATE -----------------
    describe("createCustomer", () => {
        test("should validate and create customer", async () => {
            const payload = {name: "John", email: "john@gmail.com", phone: "123"};
            const validated = {...payload};

            usecase.validator.validateSchema.mockReturnValue(validated);
            customerRepository.create.mockResolvedValue(validated);

            const result = await usecase.createCustomer(payload);

            expect(usecase.validator.validateSchema).toHaveBeenCalledWith(
                expect.any(Object),
                payload
            );
            expect(customerRepository.create).toHaveBeenCalledWith(validated);
            expect(result).toEqual(validated);
        });
    });

    // ----------------- UPDATE -----------------
    describe("updateCustomer", () => {
        test("should update and return updated data", async () => {
            const updated = {id: 3, name: "Updated"};
            const updateCustomerSchema = require("../validations/customerValidation").updateCustomerSchema;
            jest.spyOn(updateCustomerSchema, "validate").mockReturnValue({value: updated});
            customerRepository.update.mockResolvedValue(updated);

            const result = await usecase.updateCustomer(3, updated);

            expect(customerRepository.update).toHaveBeenCalledWith(3, updated);
            expect(result).toEqual(updated);
        });

        test("should throw NotFoundError if update fails", async () => {
            const updateCustomerSchema = require("../validations/customerValidation").updateCustomerSchema;
            jest.spyOn(updateCustomerSchema, "validate").mockReturnValue({value: {}});
            customerRepository.update.mockResolvedValue(null);

            await expect(usecase.updateCustomer(10, {})).rejects.toThrow(NotFoundError);
        });
    });

    // ----------------- DELETE -----------------
    describe("deleteCustomer", () => {
        test("should delete and return deleted result", async () => {
            customerRepository.delete.mockResolvedValue(true);

            const result = await usecase.deleteCustomer(4);

            expect(customerRepository.delete).toHaveBeenCalledWith(4);
            expect(result).toBe(true);
        });

        test("should throw NotFoundError if not found", async () => {
            customerRepository.delete.mockResolvedValue(null);

            await expect(usecase.deleteCustomer(50)).rejects.toThrow(NotFoundError);
        });
    });
});
