const ServiceUsecase = require("../usecases/serviceUsecase");
const serviceUsecase = ServiceUsecase

jest.mock("../repositories/serviceRepository", () => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    updateStatus: jest.fn(),
}));

jest.mock("../validations/serviceValidation", () => ({
    createServiceScheme: {validate: jest.fn()},
    updateServiceScheme: {validate: jest.fn()},
}));

jest.mock("../utils/general", () => ({
    handleJoiErrorMessage: jest.fn((e) => new Error(e.message || "Validation error")),
}));

const servicerRepository = require("../repositories/serviceRepository");
const {
    createServiceScheme,
    updateServiceScheme,
} = require("../validations/serviceValidation");
const {handleJoiErrorMessage} = require("../utils/general");

describe("ServiceUsecase", () => {

    beforeEach(() => jest.clearAllMocks());

    // --------------------------------------------------------
    // GET ALL
    // --------------------------------------------------------
    test("getAllService() should return list of services", async () => {
        servicerRepository.findAll.mockResolvedValue([{id: 1}]);

        const result = await serviceUsecase.getAllService();

        expect(servicerRepository.findAll).toHaveBeenCalled();
        expect(result).toEqual([{id: 1}]);
    });

    // --------------------------------------------------------
    // GET BY ID
    // --------------------------------------------------------
    test("getServiceById() should return service if exists", async () => {
        servicerRepository.findById.mockResolvedValue({id: 1});

        const result = await serviceUsecase.getServiceById(1);

        expect(result).toEqual({id: 1});
    });

    // --------------------------------------------------------
    // CREATE
    // --------------------------------------------------------
    test("createService() should throw validation error", async () => {
        createServiceScheme.validate.mockReturnValue({
            error: {message: "Invalid data"},
            value: null,
        });

        await expect(serviceUsecase.createService({}))
            .rejects.toThrow("Invalid data");
    });

    test("createService() should create service when valid", async () => {
        createServiceScheme.validate.mockReturnValue({
            error: null,
            value: {name: "Cuci Kering"},
        });

        servicerRepository.create.mockResolvedValue({id: 1, name: "Cuci Kering"});

        const result = await serviceUsecase.createService({name: "Cuci Kering"});

        expect(result).toEqual({id: 1, name: "Cuci Kering"});
    });

    // --------------------------------------------------------
    // UPDATE
    // --------------------------------------------------------
    test("updateService() should throw validation error", async () => {
        updateServiceScheme.validate.mockReturnValue({
            error: {message: "Invalid update"},
            value: null,
        });

        await expect(serviceUsecase.updateService(1, {}))
            .rejects.toThrow("Invalid update");
    });

    test("updateService() throws if service not found", async () => {
        updateServiceScheme.validate.mockReturnValue({
            error: null,
            value: {name: "Updated"},
        });

        servicerRepository.update.mockResolvedValue(null); // not found

        await expect(serviceUsecase.updateService(1, {name: "Updated"}))
            .rejects.toThrow("Service not found");
    });

    test("updateService() should update service", async () => {
        updateServiceScheme.validate.mockReturnValue({
            error: null,
            value: {name: "Updated Name"},
        });

        servicerRepository.update.mockResolvedValue({id: 1, name: "Updated Name"});

        const result = await serviceUsecase.updateService(1, {name: "Updated Name"});

        expect(result).toEqual({id: 1, name: "Updated Name"});
    });

    // --------------------------------------------------------
    // DELETE
    // --------------------------------------------------------
    test("deleteService() should fail if not found", async () => {
        servicerRepository.delete.mockResolvedValue(null);

        await expect(serviceUsecase.deleteService(1))
            .rejects.toThrow("Service not found");
    });

    test("deleteService() should succeed", async () => {
        servicerRepository.delete.mockResolvedValue({id: 1});

        const result = await serviceUsecase.deleteService(1);

        expect(result).toEqual({id: 1});
    });

    // --------------------------------------------------------
    // UPDATE STATUS
    // --------------------------------------------------------
    test("updateStatus() should fail if service not found", async () => {
        servicerRepository.updateStatus.mockResolvedValue(null);

        await expect(serviceUsecase.updateStatus(1))
            .rejects.toThrow("Service not found");
    });

    test("updateStatus() should succeed", async () => {
        servicerRepository.updateStatus.mockResolvedValue({id: 1, status: "ACTIVE"});

        const result = await serviceUsecase.updateStatus(1);

        expect(result).toEqual({id: 1, status: "ACTIVE"});
    });
});
