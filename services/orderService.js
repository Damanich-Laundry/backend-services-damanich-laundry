const orderRepository = require("../repositories/orderRepository");
const userRepository = require("../repositories/userRepository");
const { createOrderSchema } = require("../validations/orderValidation");
const { handleJoiErrorMessage } = require("../utils/general");

class orderService {
  async getAllOrder() {
    return await orderRepository.findAll();
  }

  async getOrderById(id) {
    return await orderRepository.findById(id);
  }

  async createOrder(userId, data) {
    // Validasi body pakai Joi

    const { error } = createOrderSchema.validate(data, { abortEarly: false });
    if (error) throw handleJoiErrorMessage(error);

    // Ambil user dari repo
    const user = await userRepository.findById(userId);

    // Semua logic create dipindahkan ke repository
    return await orderRepository.createOrder(user, data);
  }
}

module.exports = new orderService();
