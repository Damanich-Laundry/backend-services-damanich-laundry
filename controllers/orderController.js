const orderService = require("../services/orderService");

class orderController {
  async getAll(req, res) {
    try {
      const orders = await orderService.getAllOrder();
      return res.status(200).json({
        status: "Success",
        message: "Orders found",
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        status: "Failed",
        message: error.message,
        data: null,
      });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      if (!id || isNaN(id)) {
        return res.status(400).json({
          status: "Failed",
          message: "Invalid or missing inventory ID",
          data: null,
        });
      }

      const order = await orderService.getOrderById(id);

      if (!order) {
        return res.status(404).json({
          status: "Failed",
          message: "Order with this id is not found",
          data: null,
        });
      }

      return res.status(200).json({
        status: "Success",
        message: "Order found in this id",
        data: order,
      });
    } catch (error) {
      res.status(500).json({
        status: "Failed",
        message: error.message,
        data: null,
      });
    }
  }

  async create(req, res) {
    try {
      const userId = req.user?.id; // pastikan ada user
      const data = req.body;

      if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
          status: "Failed",
          message: "Request body cannot be empty",
          data: null,
        });
      }

      const order = await orderService.createOrder(userId, data);

      return res.status(201).json({
        status: "Success",
        message: "Order created successfully",
        data: order,
      });
    } catch (error) {
      const statusCode = error.statusCode || 500;
      const response = {
        status: "Failed",
        message: error.message,
        data: null,
      };

      if (error.details) {
        response.errors = error.details;
      }
      return res.status(statusCode).json(response);
    }
  }
}

module.exports = new orderController();
