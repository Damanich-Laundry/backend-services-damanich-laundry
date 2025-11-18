const reportUsecase = require("../usecases/reportUsecase");
const { successResponse } = require("../utils/responseHelpers");

class ReportController {
  async getDashboard(req, res, next) {
    try {
      const data = await reportUsecase.getDashboard();
      return successResponse(res, "Dashboard report fetched", data);
    } catch (err) {
      next(err);
    }
  }

  async getRevenue(req, res, next) {
    try {
      const { from, to } = req.query;
      const data = await reportUsecase.getRevenue(from, to);
      return successResponse(res, "Revenue report fetched", data);
    } catch (err) {
      next(err);
    }
  }

  async getOrders(req, res, next) {
    try {
      const { from, to } = req.query;
      const data = await reportUsecase.getOrders(from, to);
      return successResponse(res, "Orders report fetched", data);
    } catch (err) {
      next(err);
    }
  }

  async getCustomers(req, res, next) {
    try {
      const data = await reportUsecase.getCustomers();
      return successResponse(res, "Customers report fetched", data);
    } catch (err) {
      next(err);
    }
  }

  async getServices(req, res, next) {
    try {
      const data = await reportUsecase.getServices();
      return successResponse(res, "Services report fetched", data);
    } catch (err) {
      next(err);
    }
  }

  async getInventory(req, res, next) {
    try {
      const data = await reportUsecase.getInventory();
      return successResponse(res, "Inventory report fetched", data);
    } catch (err) {
      next(err);
    }
  }

  async getExpenses(req, res, next) {
    try {
      const { from, to } = req.query;
      const data = await reportUsecase.getExpenses(from, to);
      return successResponse(res, "Expenses report fetched", data);
    } catch (err) {
      next(err);
    }
  }

  async getProfitLoss(req, res, next) {
    try {
      const { from, to } = req.query;
      const data = await reportUsecase.getProfitLoss(from, to);
      return successResponse(res, "Profit & Loss report fetched", data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ReportController();
