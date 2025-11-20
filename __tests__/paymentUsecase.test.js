const PaymentUsecase = require("../usecases/paymentUsecase");
const paymentUsecase = PaymentUsecase;

jest.mock("../repositories/paymentRepository", () => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    findByOrderId: jest.fn(),
    findByOrder: jest.fn(),
    create: jest.fn(),
}));

jest.mock("../models", () => ({
    Order: {
        findByPk: jest.fn(),
    },
}));

jest.mock("sequelize", () => ({
    Op: {gte: Symbol("gte"), lte: Symbol("lte")},
}));

// Mock validation
jest.mock("../validations/paymentValidation", () => ({
    createPaymentSchema: {validate: jest.fn()},
    updatePaymentSchema: {validate: jest.fn()},
}));


// Import mocks
const paymentRepository = require("../repositories/paymentRepository");
const {Order} = require("../models");
const {createPaymentSchema, updatePaymentSchema} = require("../validations/paymentValidation");

describe("PaymentUsecase", () => {
    beforeEach(() => jest.clearAllMocks());

    // ----------------------------------------------------------------
    // GET ALL
    // ----------------------------------------------------------------
    test("getAll() should build filter and call repository", async () => {
        paymentRepository.findAll.mockResolvedValue([{id: 1}]);

        const query = {from: "2025-01-01", to: "2025-01-31", status: "SUCCESS"};
        const result = await paymentUsecase.getAll(query);

        expect(paymentRepository.findAll).toHaveBeenCalled();
        expect(result).toEqual([{id: 1}]);
    });

    // ----------------------------------------------------------------
    // GET BY ID
    // ----------------------------------------------------------------
    test("getById() returns payment", async () => {
        paymentRepository.findById.mockResolvedValue({id: 1});

        const result = await paymentUsecase.getById(1);
        expect(result).toEqual({id: 1});
    });

    // ----------------------------------------------------------------
    // GET BY ORDER
    // ----------------------------------------------------------------
    test("getByOrder returns null when orderId missing", async () => {
        const result = await paymentUsecase.getByOrder(null);
        expect(result).toBeNull();
    });

    test("getByOrder returns payment", async () => {
        paymentRepository.findByOrderId.mockResolvedValue({id: 10});

        const result = await paymentUsecase.getByOrder(1);
        expect(result).toEqual({id: 10});
    });

    // ----------------------------------------------------------------
    // CREATE PAYMENT
    // ----------------------------------------------------------------
    test("create() fails if validation error", async () => {
        createPaymentSchema.validate.mockReturnValue({
            error: {details: [{message: "Invalid field"}]},
        });

        await expect(paymentUsecase.create({}))
            .rejects.toThrow("Invalid field");
    });

    test("create() fails if order not found", async () => {
        createPaymentSchema.validate.mockReturnValue({error: null});
        Order.findByPk.mockResolvedValue(null);

        await expect(paymentUsecase.create({order_id: 5}))
            .rejects.toThrow("Order not found");
    });

    test("create() fails if payment already exists", async () => {
        createPaymentSchema.validate.mockReturnValue({error: null});
        Order.findByPk.mockResolvedValue({id: 5});
        paymentRepository.findByOrder.mockResolvedValue({id: 99});

        await expect(paymentUsecase.create({order_id: 5}))
            .rejects.toThrow("Payment for this order already exists");
    });

    test("create() success and update order status", async () => {
        createPaymentSchema.validate.mockReturnValue({error: null});

        const mockOrder = {
            id: 5,
            payment_status: null,
            save: jest.fn(),
        };

        Order.findByPk.mockResolvedValue(mockOrder);
        paymentRepository.findByOrder.mockResolvedValue(null);
        paymentRepository.create.mockResolvedValue({id: 10});

        const result = await paymentUsecase.create({
            order_id: 5,
            status: "SUCCESS",
        });

        expect(result).toEqual({id: 10});
        expect(mockOrder.payment_status).toBe("PAID");
        expect(mockOrder.save).toHaveBeenCalled();
    });

    // ----------------------------------------------------------------
    // UPDATE PAYMENT
    // ----------------------------------------------------------------
    test("update() fails if validation error", async () => {
        updatePaymentSchema.validate.mockReturnValue({
            error: {details: [{message: "Bad data"}]},
        });

        await expect(paymentUsecase.update(1, {}))
            .rejects.toThrow("Bad data");
    });

    test("update() fails if payment not found", async () => {
        updatePaymentSchema.validate.mockReturnValue({error: null});
        paymentRepository.findById.mockResolvedValue(null);

        await expect(paymentUsecase.update(1, {}))
            .rejects.toThrow("Payment not found");
    });

    test("update() success and updates order payment status", async () => {
        updatePaymentSchema.validate.mockReturnValue({error: null});

        const payment = {
            id: 1,
            order_id: 5,
            status: "SUCCESS",
            update: jest.fn().mockResolvedValue(true),
        };

        const mockOrder = {
            id: 5,
            payment_status: "",
            save: jest.fn(),
        };

        paymentRepository.findById.mockResolvedValue(payment);
        Order.findByPk.mockResolvedValue(mockOrder);

        const result = await paymentUsecase.update(1, {status: "SUCCESS"});

        expect(result).toBe(payment);
        expect(mockOrder.payment_status).toBe("PAID");
        expect(mockOrder.save).toHaveBeenCalled();
    });

    // ----------------------------------------------------------------
    // UPDATE ORDER PAYMENT STATUS (DIRECT TEST)
    // ----------------------------------------------------------------
    test("updateOrderPaymentStatus() sets PAID for SUCCESS", async () => {
        const mockOrder = {
            payment_status: "",
            save: jest.fn(),
        };

        await paymentUsecase.updateOrderPaymentStatus(mockOrder, "SUCCESS");
        expect(mockOrder.payment_status).toBe("PAID");
        expect(mockOrder.save).toHaveBeenCalled();
    });

    test("updateOrderPaymentStatus() sets FAILED for FAILED", async () => {
        const mockOrder = {
            payment_status: "",
            save: jest.fn(),
        };

        await paymentUsecase.updateOrderPaymentStatus(mockOrder, "FAILED");
        expect(mockOrder.payment_status).toBe("FAILED");
    });

    test("updateOrderPaymentStatus() sets PENDING otherwise", async () => {
        const mockOrder = {
            payment_status: "",
            save: jest.fn(),
        };

        await paymentUsecase.updateOrderPaymentStatus(mockOrder, "WAITING");
        expect(mockOrder.payment_status).toBe("PENDING");
    });

});
