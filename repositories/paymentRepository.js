const { Payment, Order } = require("../models");
const { Op } = require("sequelize");

class PaymentRepository {
  async findAll(filter) {
    return await Payment.findAll({
      where: filter,
      include: [{ model: Order }],
    });
  }

  async findByOrderId(orderId) {
    return await Payment.findOne({
      where: { order_id: orderId },
    });
  }

  async findByOrder(orderId) {
    return await Payment.findOne({
      where: { order_id: orderId },
      include: [{ model: Order }],
    });
  }

  async create(data) {
    return await Payment.create(data);
  }

  async update(id, data) {
    const payment = await Payment.findByPk(id);
    if (!payment) return null;
    return await payment.update(data);
  }
}

module.exports = new PaymentRepository();
