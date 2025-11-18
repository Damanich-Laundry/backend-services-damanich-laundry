const paymentRepository = require("../repositories/paymentRepository");
const { Order } = require("../models");
const { Op } = require("sequelize");
const {
  createPaymentSchema,
  updatePaymentSchema,
} = require("../validations/paymentValidation");

class PaymentUsecase {
  async getAll(query) {
    const { from, to, status, payment_method } = query;

    const filter = {};

    if (status) filter.status = status;
    if (payment_method) filter.payment_method = payment_method;

    if (from || to) {
      filter.payment_date = {};
      if (from) filter.payment_date[Op.gte] = new Date(from);
      if (to) filter.payment_date[Op.lte] = new Date(to);
    }

    return await paymentRepository.findAll(filter);
  }

  async getById(id) {
    return await paymentRepository.findById(id);
  }

  async getByOrder(orderId) {
    // validation basic
    if (!orderId) return null;

    const payment = await paymentRepository.findByOrderId(orderId);

    // return NULL kalau tidak ada
    return payment || null;
  }

  async create(data) {
    const { error } = createPaymentSchema.validate(data, { abortEarly: false });
    if (error) throw new Error(error.details.map((d) => d.message).join(", "));

    const { order_id, status } = data;

    const order = await Order.findByPk(order_id);
    if (!order) throw new Error("Order not found");

    const existing = await paymentRepository.findByOrder(order_id);
    if (existing) throw new Error("Payment for this order already exists");

    const payment = await paymentRepository.create(data);

    await this.updateOrderPaymentStatus(order, status);

    return payment;
  }

  async update(id, data) {
    const { error } = updatePaymentSchema.validate(data, { abortEarly: false });
    if (error) throw new Error(error.details.map((d) => d.message).join(", "));

    const payment = await paymentRepository.findById(id);
    if (!payment) throw new Error("Payment not found");

    await payment.update(data);

    const order = await Order.findByPk(payment.order_id);

    await this.updateOrderPaymentStatus(order, payment.status);

    return payment;
  }

  async updateOrderPaymentStatus(order, paymentStatus) {
    if (!order) return;

    if (paymentStatus === "SUCCESS") order.payment_status = "PAID";
    else if (paymentStatus === "FAILED") order.payment_status = "FAILED";
    else order.payment_status = "PENDING";

    await order.save();
  }
}

module.exports = new PaymentUsecase();
