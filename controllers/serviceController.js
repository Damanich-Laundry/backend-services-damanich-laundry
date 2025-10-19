const serviceService = require("../services/serviceService");

class serviceController {
  async getAll(req, res) {
    try {
      const services = await serviceService.getAllService();
      res.json({
        status: "Success",
        message: "Services found",
        data: services,
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
          message: "Invalid or missing service ID",
          data: null,
        });
      }
      const service = await serviceService.getServiceById(id);
      if (!service) {
        return res.status(404).json({
          status: "Failed",
          message: "Service by id not found",
          data: null,
        });
      }
      return res.json({
        status: "Success",
        message: "Service by id found",
        data: service,
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
      const service = await serviceService.createService(req.body);
      res.status(201).json({
        status: "Success",
        message: "Service created",
        data: service,
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
          message: "Invalid or missing service ID",
          data: null,
        });
      }
      const updatedService = await serviceService.updateService(id, req.body);
      if (!updatedService) {
        return res.status(404).json({
          status: "Failed",
          message: "Service by id not found",
          data: null,
        });
      }
      return res.json({
        status: "Success",
        message: "Service by id updated",
        data: updatedService,
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
          message: "Invalid or missing service ID",
          data: null,
        });
      }

      const deletedService = await serviceService.deleteService(id);
      if (!deletedService) {
        return res.status(404).json({
          status: "Failed",
          message: "Service by id not found",
          data: null,
        });
      }

      return res.status(200).json({
        status: "Success",
        message: "Service is deleted",
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

  async updateStatus(req, res) {
    try {
      const id = req.params.id;
      if (!id || isNaN(id)) {
        return res.status(400).json({
          status: "Failed",
          message: "Invalid or missing service ID",
          data: null,
        });
      }
      const updatedService = await serviceService.updateStatus(id);
      if (!updatedService) {
        return res.status(404).json({
          status: "Failed",
          message: "Service by id not found",
          data: null,
        });
      }
      return res.json({
        status: "Success",
        message: "Service by id updated",
        data: updatedService,
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

module.exports = new serviceController();
