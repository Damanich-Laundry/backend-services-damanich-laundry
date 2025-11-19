const orderUsecase = require("../../usecases/orderUsecase");

// Mock repository
jest.mock("../../repositories/orderRepository", () => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    createOrder: jest.fn(),
    updateOrder: jest.fn(),
    deleteOrder: jest.fn(),
    updateStatus: jest.fn(),
    getInvoice: jest.fn(),
    searchOrders: jest.fn(),
    getOrdersByDateRange: jest.fn(),
}));

jest.mock("../../repositories/userRepository", () => ({
    findById: jest.fn(),
}));

// Import mocks
const orderRepository = require("../../repositories/orderRepository");
const userRepository = require("../../repositories/userRepository");

describe("OrderUsecase", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ======================================================
    // GET ALL
    // ======================================================
    test("getAllOrder() should return orders", async () => {
        const mockData = [{id: 1}];
        orderRepository.findAll.mockResolvedValue(mockData);

        const result = await orderUsecase.getAllOrder();
        expect(result).toEqual(mockData);
        expect(orderRepository.findAll).toHaveBeenCalled();
    });

    // ======================================================
    // GET BY ID
    // ======================================================
    test("getOrderById() should return order", async () => {
        orderRepository.findById.mockResolvedValue({id: 1});
        const result = await orderUsecase.getOrderById(1);
        expect(result).toEqual({id: 1});
    });

    // ======================================================
    // CREATE ORDER
    // ======================================================
    test("createOrder() should throw if user not found", async () => {
        userRepository.findById.mockResolvedValue(null);

        await expect(
            orderUsecase.createOrder(1, {total_amount: 100})
        ).rejects.toThrow("User not found");
    });

    test("createOrder() should create order when valid", async () => {
        userRepository.findById.mockResolvedValue({id: 1});
        orderRepository.createOrder.mockResolvedValue({id: 99});

        const mockData = {
            total_amount: 100,
            customer_id: 1,
        };

        // Bypass Joi with mock (untuk mempermudah unit test)
        jest.spyOn(require("../../validations/orderValidation"), "createOrderSchema", "get")
            .mockReturnValue({
                validate: () => ({error: null})
            });

        const result = await orderUsecase.createOrder(1, mockData);

        expect(result).toEqual({id: 99});
        expect(orderRepository.createOrder).toHaveBeenCalled();
    });

    // ======================================================
    // UPDATE ORDER
    // ======================================================
    test("updateOrder() should throw when not found", async () => {
        orderRepository.updateOrder.mockResolvedValue(null);

        await expect(
            orderUsecase.updateOrder(1, {})
        ).rejects.toThrow("Order not found");
    });

    test("updateOrder() should return updated order", async () => {
        const updatedOrder = {id: 1, total_amount: 200};
        orderRepository.updateOrder.mockResolvedValue(updatedOrder);

        const result = await orderUsecase.updateOrder(1, {});
        expect(result).toEqual(updatedOrder);
    });

    // ======================================================
    // DELETE ORDER
    // ======================================================
    test("deleteOrder() should throw when not found", async () => {
        orderRepository.deleteOrder.mockResolvedValue(null);

        await expect(orderUsecase.deleteOrder(1))
            .rejects.toThrow("Order not found");
    });

    test("deleteOrder() should return deleted data", async () => {
        orderRepository.deleteOrder.mockResolvedValue({id: 1});

        const result = await orderUsecase.deleteOrder(1);
        expect(result).toEqual({id: 1});
    });

    // ======================================================
    // UPDATE STATUS
    // ======================================================
    test("updateStatus() should throw when not found", async () => {
        orderRepository.updateStatus.mockResolvedValue(null);

        await expect(orderUsecase.updateStatus(1, "done"))
            .rejects.toThrow("Order not found");
    });

    test("updateStatus() should return updated", async () => {
        const updated = {id: 1, status: "done"};
        orderRepository.updateStatus.mockResolvedValue(updated);

        const result = await orderUsecase.updateStatus(1, "done");
        expect(result).toEqual(updated);
    });

    // ======================================================
    // GET INVOICE
    // ======================================================
    test("getInvoice() should throw when not found", async () => {
        orderRepository.getInvoice.mockResolvedValue(null);

        await expect(orderUsecase.getInvoice(1))
            .rejects.toThrow("Order not found");
    });

    test("getInvoice() should return invoice", async () => {
        const invoice = {id: 1, total: 123};
        orderRepository.getInvoice.mockResolvedValue(invoice);

        const result = await orderUsecase.getInvoice(1);
        expect(result).toEqual(invoice);
    });

    // ======================================================
    // SEARCH ORDERS
    // ======================================================
    test("searchOrders() should pass query to repository", async () => {
        orderRepository.searchOrders.mockResolvedValue([{id: 1}]);

        const result = await orderUsecase.searchOrders({status: "paid"});
        expect(result).toEqual([{id: 1}]);
    });

    // ======================================================
    // DATE RANGE
    // ======================================================
    test("getOrdersByDateRange() should map correctly", async () => {
        const mockOrders = [
            {
                id: 1,
                Customer: {full_name: "John Doe"},
                total_amount: 50000,
                order_date: "2025-02-10"
            }
        ];

        orderRepository.getOrdersByDateRange.mockResolvedValue(mockOrders);

        const result = await orderUsecase.getOrdersByDateRange("2025-02-01", "2025-02-28");

        expect(result).toEqual([
            {
                orderId: 1,
                customer: "John Doe",
                total: 50000,
                date: "2025-02-10"
            }
        ]);
    });

});
