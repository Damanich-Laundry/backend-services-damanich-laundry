const orderUsecase = require("../usecases/orderUsecase");

class OrderController {
  async getAll(req, res) {
    try {
      const orders = await orderUsecase.getAllOrder();
      res.status(200).json({
        status: "Success",
        message: "All orders retrieved successfully",
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        status: "Failed",
        message: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const order = await orderUsecase.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({
          status: "Failed",
          message: "Order not found",
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Order found",
        data: order,
      });
    } catch (error) {
      res.status(500).json({
        status: "Failed",
        message: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const userId = req.user.id; // assumed from JWT
      const newOrder = await orderUsecase.createOrder(userId, req.body);

      res.status(201).json({
        status: "Success",
        message: "Order created successfully",
        data: newOrder,
      });
    } catch (error) {
      res.status(500).json({
        status: "Failed",
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const updated = await orderUsecase.updateOrder(req.params.id, req.body);
      res.status(200).json({
        status: "Success",
        message: "Order updated successfully",
        data: updated,
      });
    } catch (error) {
      res.status(500).json({ status: "Failed", message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await orderUsecase.deleteOrder(req.params.id);
      res.status(200).json({
        status: "Success",
        message: "Order deleted successfully",
        data: deleted,
      });
    } catch (error) {
      res.status(500).json({ status: "Failed", message: error.message });
    }
  }

  async updateStatus(req, res) {
    try {
      const updated = await orderUsecase.updateStatus(
        req.params.id,
        req.body.status
      );
      res.status(200).json({
        status: "Success",
        message: "Order status updated successfully",
        data: updated,
      });
    } catch (error) {
      res.status(500).json({ status: "Failed", message: error.message });
    }
  }

  async getInvoice(req, res) {
    try {
      const invoice = await orderUsecase.getInvoice(req.params.id);
      res.status(200).json({
        status: "Success",
        message: "Invoice retrieved successfully",
        data: invoice,
      });
    } catch (error) {
      res.status(500).json({ status: "Failed", message: error.message });
    }
  }

  async search(req, res) {
    try {
      const orders = await orderUsecase.searchOrders(req.query);
      res.status(200).json({
        status: "Success",
        message: "Orders found",
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        status: "Failed",
        message: error.message,
      });
    }
  }
}

module.exports = new OrderController();
