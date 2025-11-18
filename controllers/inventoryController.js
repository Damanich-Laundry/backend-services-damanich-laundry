const inventoryUsecase = require("../usecases/inventoryUsecase");

class inventoryController {
  async getAll(req, res) {
    try {
      const inventories = await inventoryUsecase.getAllInventory();
      return res.status(200).json({
        status: "Success",
        message: "Inventories found",
        data: inventories,
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

      const inventory = await inventoryUsecase.getInventoryById(id);

      if (!inventory) {
        return res.status(404).json({
          status: "Failed",
          message: "Inventory with this id is not found",
          data: null,
        });
      }

      return res.status(200).json({
        status: "Success",
        message: "Inventory found in this id",
        data: inventory,
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

  async create(req, res) {
    try {
      const inventori = await inventoryUsecase.createInventory(req.body);
      return res.status(201).json({
        status: "Success",
        message: "Inventory created successfully",
        data: inventori,
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

  async update(req, res) {
    try {
      const id = req.params.id;
      if (!id || isNaN(id)) {
        return res.status(400).json({
          status: "Failed",
          message: "Invalid or missing inventory ID",
          data: null,
        });
      }

      const updatedInventory = await inventoryUsecase.updateInventory(
        id,
        req.body
      );

      if (!updatedInventory) {
        return res.status(404).json({
          status: "Failed",
          message: "Inventory with this id is not found",
          data: null,
        });
      }
      return res.status(200).json({
        status: "Success",
        message: "Inventory updated successfully",
        data: updatedInventory,
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

  async delete(req, res) {
    try {
      const id = req.params.id;
      if (!id || isNaN(id)) {
        return res.status(400).json({
          status: "Failed",
          message: "Invalid or missing inventory ID",
          data: null,
        });
      }
      const deletedInventory = await inventoryUsecase.deleteInventory(id);
      if (!deletedInventory) {
        return res.status(404).json({
          status: "Failed",
          message: "Inventory with this id is not found",
          data: null,
        });
      }
      return res.status(200).json({
        status: "Success",
        message: "Inventory deleted successfully",
        data: null,
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

  async createRestock(req, res) {
    try {
      const inventoryId = req.params.id;
      if (!inventoryId || isNaN(inventoryId)) {
        return res.status(400).json({
          status: "Failed",
          message: "Invalid or missing inventory ID",
          data: null,
        });
      }
      const stock = await inventoryUsecase.createRestock(inventoryId, req.body);
      if (!stock) {
        return res.status(404).json({
          status: "Failed",
          message: "Inventory with this id is not found",
          data: null,
        });
      }
      return res.status(201).json({
        status: "Success",
        message: "Stock created successfully",
        data: stock,
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

  async getLowStock(req, res) {
    try {
      const lowStock = await inventoryUsecase.getLowStock();
      return res.status(200).json({
        status: "Success",
        message: "Low stock found",
        data: lowStock,
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

  async getLogByInventoryId(req, res) {
    try {
      const inventoryId = req.params.id;
      const checkId = await inventoryUsecase.getInventoryById(inventoryId);
      if (!checkId) {
        return res.status(404).json({
          status: "Failed",
          message: "Inventory with this id is not found",
          data: null,
        });
      }

      const log = await inventoryUsecase.getInventoryLogs(inventoryId);
      return res.status(200).json({
        status: "Success",
        message: "Log found",
        data: log,
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

module.exports = new inventoryController();
