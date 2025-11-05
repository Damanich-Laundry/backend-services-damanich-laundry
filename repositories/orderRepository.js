const { v4: uuidv4 } = require("uuid");
const { sequelize, Order } = require("../models");

const userRepository = require("./userRepository");
const customerRepository = require("./customerRepository");
const serviceRepository = require("./serviceRepository");
const orderItemRepository = require("./orderItemRepository");
const inventoryRepository = require("./inventoryRepository");

class orderRepository {
  async findAll() {
    return await Order.findAll();
  }

  async findById(id) {
    return await Order.findByPk(id);
  }

  async update(id, data, options = {}) {
    const order = await Order.findByPk(id);
    if (!order) return null;
    await order.update(data, options);
    return order;
  }

  // 🔥 Pindahan dari orderService.createOrder
  async createOrder(user, data) {
    const t = await sequelize.transaction();

    try {
      // Validasi: hanya staff yang boleh bikin order
      if (!user || user.role !== "staff") {
        throw new Error("Only staff can create order");
      }

      // Validasi customer
      const customer = await customerRepository.findById(data.customer_id);
      if (!customer) {
        throw new Error("Customer not found");
      }

      // Buat order baru
      const order = await Order.create(
        {
          order_number: uuidv4(),
          customer_id: data.customer_id,
          user_id: user.id,
          order_date: new Date(),
          estimated_done: data.estimated_done || null,
          pickup_date: data.pickup_date || null,
          status: data.status || "RECEIVED",
          payment_status: data.payment_status || "UNPAID",
          payment_method: data.payment_method,
          total_weight: data.total_weight || 0,
          discount: data.discount || 0,
          notes: data.notes || null,
        },
        { transaction: t }
      );

      let subtotal = 0;

      // Tambahkan item layanan
      if (Array.isArray(data.items) && data.items.length > 0) {
        for (const item of data.items) {
          const service = await serviceRepository.findById(item.service_id);
          if (!service) throw new Error("Service not found");

          const unit_price = service.price_per_unit;
          const subtotalItem = unit_price * item.quantity;
          subtotal += subtotalItem;

          await orderItemRepository.create(
            {
              order_id: order.id,
              quantity: item.quantity,
              unit_price: unit_price,
              subtotal: subtotalItem,
              notes: item.notes || null,
            },
            { transaction: t }
          );
        }
      }

      // Inventory logs (opsional)
      if (
        Array.isArray(data.inventory_logs) &&
        data.inventory_logs.length > 0
      ) {
        for (const invLog of data.inventory_logs) {
          const inventory = await inventoryRepository.findById(
            invLog.inventory_id
          );
          if (!inventory) throw new Error("Inventory not found");

          await inventoryRepository.createRestock(
            {
              order_id: order.id,
              inventory_id: invLog.inventory_id,
              type: invLog.type || "OUT",
              quantity: invLog.quantity,
              notes: invLog.notes || null,
            },
            { transaction: t }
          );
        }
      }

      const total_amount = subtotal - order.discount;

      // Update total & subtotal
      await order.update(
        {
          subtotal,
          total_amount,
        },
        { transaction: t }
      );

      await t.commit();
      return order;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}

module.exports = new orderRepository();
