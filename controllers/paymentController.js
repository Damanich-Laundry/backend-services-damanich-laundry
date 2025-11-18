const paymentUsecase = require("../usecases/paymentUsecase");

module.exports = {
  async getAll(req, res) {
    const payments = await paymentUsecase.getAll(req.query);

    return res.json({
      status: "Success",
      message: "Payments retrieved successfully",
      data: payments,
    });
  },

  async getById(req, res) {
    const payment = await paymentUsecase.getById(req.params.id);

    if (!payment)
      return res.status(404).json({
        status: "Failed",
        message: "Payment by id : " + req.params.id + " not found",
      });

    return res.json({
      status: "Success",
      message: "Payment by id : " + req.params.id + " found",
      data: payment,
    });
  },

  async getByOrder(req, res) {
    const { orderId } = req.params;

    const payment = await paymentUsecase.getByOrder(orderId);

    if (!payment) {
      return res.status(200).json({
        status: "Success",
        message: "No payment found for this order",
        data: null,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Payment retrieved successfully",
      data: payment,
    });
  },

  async create(req, res) {
    try {
      const payment = await paymentUsecase.create(req.body);

      return res.json({
        status: "Success",
        message: "Payment created successfully",
        data: payment,
      });
    } catch (err) {
      return res.status(400).json({ status: "Failed", message: err.message });
    }
  },

  async update(req, res) {
    try {
      const payment = await paymentUsecase.update(req.params.id, req.body);

      return res.json({
        status: "Success",
        message: "Payment updated successfully",
        data: payment,
      });
    } catch (err) {
      return res.status(400).json({ status: "Failed", message: err.message });
    }
  },
};
