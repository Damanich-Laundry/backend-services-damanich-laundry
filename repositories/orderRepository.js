const { v4: uuidv4 } = require("uuid");
const { sequelize, Order } = require("../models");
const { Op } = require("sequelize");
const customerRepository = require("./customerRepository");
const serviceRepository = require("./serviceRepository");
const orderItemRepository = require("./orderItemRepository");
const inventoryRepository = require("./inventoryRepository");

class OrderRepository {
  async findAll() {
    return await Order.findAll({
      include: ["Customer", "User", "OrderItems", "Payment", "InventoryLogs"],
    });
  }

  async findById(id) {
    return await Order.findByPk(id, {
      include: ["Customer", "User", "OrderItems", "Payment", "InventoryLogs"],
    });
  }

  async update(id, data, options = {}) {
    const order = await Order.findByPk(id);
    if (!order) return null;
    await order.update(data, options);
    return order;
  }

  /**
   * 🧾 Buat order baru (dengan transaksi penuh)
   */
  async createOrder(user, data) {
    const t = await sequelize.transaction();

    try {
      if (!user || user.role !== "staff") {
        throw new Error("Only staff can create an order");
      }

      const customer = await customerRepository.findById(data.customer_id);
      if (!customer) throw new Error("Customer not found");

      // 1️⃣ Buat order utama
      const order = await Order.create(
        {
          order_number: uuidv4(),
          customer_id: data.customer_id,
          user_id: user.id,
          order_date: new Date(),
          estimated_done: data.estimated_done || null,
          pickup_date: data.pickup_date || null,
          status: data.status?.toUpperCase() || "RECEIVED",
          payment_status: "UNPAID",
          payment_method: data.payment_method?.toUpperCase() || "CASH",
          total_weight: data.total_weight || 0,
          discount: data.discount || 0,
          notes: data.notes || null,
        },
        { transaction: t }
      );

      // 2️⃣ Tambahkan order items
      let subtotal = 0;

      if (Array.isArray(data.items) && data.items.length > 0) {
        for (const item of data.items) {
          const service = await serviceRepository.findById(item.service_id);
          if (!service)
            throw new Error(`Service not found (id: ${item.service_id})`);

          const unit_price = service.price_per_unit;
          const subtotalItem = unit_price * item.quantity;
          subtotal += subtotalItem;

          await orderItemRepository.create(
            {
              order_id: order.id,
              service_id: item.service_id,
              quantity: item.quantity,
              unit_price,
              subtotal: subtotalItem,
              notes: item.notes || null,
            },
            { transaction: t }
          );
        }
      }

      // 3️⃣ Catat inventory log (pemakaian bahan)
      if (
        Array.isArray(data.inventory_logs) &&
        data.inventory_logs.length > 0
      ) {
        for (const invLog of data.inventory_logs) {
          await inventoryRepository.createRestock(
            invLog.inventory_id,
            {
              order_id: order.id,
              type: invLog.type || "OUT",
              quantity: invLog.quantity,
              notes: invLog.notes || null,
            },
            { transaction: t }
          );
        }
      }

      // 4️⃣ Hitung total
      const total_amount = subtotal - (data.discount || 0);
      await order.update({ subtotal, total_amount }, { transaction: t });

      await t.commit();

      // 5️⃣ Ambil ulang order lengkap
      const createdOrder = await Order.findByPk(order.id, {
        include: [
          {
            model: sequelize.models.Customer,
            attributes: ["id", "name", "phone", "email"],
          },
          {
            model: sequelize.models.User,
            attributes: ["id", "full_name", "username", "role"],
          },
          {
            model: sequelize.models.OrderItem,
            include: [
              {
                model: sequelize.models.Service,
                attributes: ["id", "service_name", "price_per_unit", "unit"],
              },
            ],
          },
          {
            model: sequelize.models.InventoryLog,
            include: [
              {
                model: sequelize.models.Inventory,
                attributes: ["id", "item_name", "category"],
              },
            ],
          },
        ],
      });

      return createdOrder;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
  /**
   * 🔄 Update order data (general)
   */
  async updateOrder(id, data) {
    const order = await Order.findByPk(id);
    if (!order) return null;

    await order.update(data);
    return await this.findById(id);
  }

  /**
   * 🗑️ Delete order
   */
  async deleteOrder(id) {
    const order = await Order.findByPk(id);
    if (!order) return null;
    await order.destroy();
    return order;
  }

  /**
   * 🔁 Update status order
   */
  async updateStatus(id, newStatus) {
    const order = await Order.findByPk(id);
    if (!order) return null;

    await order.update({ status: newStatus.toUpperCase() });
    return order;
  }

  /**
   * 🧾 Generate Invoice (return full data)
   */
  async getInvoice(id) {
    const order = await Order.findByPk(id, {
      include: [
        { model: sequelize.models.Customer },
        { model: sequelize.models.User },
        {
          model: sequelize.models.OrderItem,
          include: [sequelize.models.Service],
        },
        {
          model: sequelize.models.InventoryLog,
          include: [sequelize.models.Inventory],
        },
        sequelize.models.Payment,
      ],
    });
    return order;
  }

  /**
   * 🔍 Search order by status & date
   */

  async searchOrders({ status, date }) {
    const where = {};

    if (status) {
      where.status = status.toUpperCase();
    }

    if (date) {
      // Buat range dari awal sampai akhir hari
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      where.order_date = {
        [Op.between]: [startOfDay, endOfDay],
      };
    }

    return await Order.findAll({
      where,
      include: [
        {
          model: sequelize.models.Customer,
          attributes: ["id", "name", "phone", "email"],
        },
        {
          model: sequelize.models.User,
          attributes: ["id", "username", "full_name", "role"],
        },
        {
          model: sequelize.models.OrderItem,
          include: [
            {
              model: sequelize.models.Service,
              attributes: ["id", "service_name", "price_per_unit"],
            },
          ],
        },
        {
          model: sequelize.models.InventoryLog,
          include: [
            {
              model: sequelize.models.Inventory,
              attributes: ["id", "item_name"],
            },
          ],
        },
      ],
    });
  }
}

module.exports = new OrderRepository();
