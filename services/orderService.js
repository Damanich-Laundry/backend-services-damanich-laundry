const orderRepository = require("../repositories/orderRepository");
const userRepository = require("../repositories/userRepository");
const { createOrderSchema } = require("../validations/orderValidation");
const { handleJoiErrorMessage } = require("../utils/general");

class OrderService {
  async getAllOrder() {
    return await orderRepository.findAll();
  }

  async getOrderById(id) {
    return await orderRepository.findById(id);
  }

  async createOrder(userId, data) {
    const { error } = createOrderSchema.validate(data, { abortEarly: false });
    if (error) throw handleJoiErrorMessage(error);

    const user = await userRepository.findById(userId);
    if (!user) throw new Error("User not found");

    return await orderRepository.createOrder(user, data);
  }

  async updateOrder(id, data) {
    const updated = await orderRepository.updateOrder(id, data);
    if (!updated) throw new Error("Order not found");
    return updated;
  }

  async deleteOrder(id) {
    const deleted = await orderRepository.deleteOrder(id);
    if (!deleted) throw new Error("Order not found");
    return deleted;
  }

  async updateStatus(id, status) {
    const updated = await orderRepository.updateStatus(id, status);
    if (!updated) throw new Error("Order not found");
    return updated;
  }

  async getInvoice(id) {
    const order = await orderRepository.getInvoice(id);
    if (!order) throw new Error("Order not found");
    return order;
  }

  async searchOrders(query) {
    const { status, date } = query;
    return await orderRepository.searchOrders({ status, date });
  }
}

module.exports = new OrderService();
