const servicerRepository = require("../repositories/serviceRepository");
const {
  createServiceScheme,
  updateServiceScheme,
} = require("../validations/serviceValidation");

const { handleJoiErrorMessage } = require("../utils/general");

class ServiceService {
  async getAllService() {
    return await servicerRepository.findAll();
  }

  async getServiceById(id) {
    const service = await servicerRepository.findById(id);
    return service;
  }

  async createService(data) {
    const { error, value } = createServiceScheme.validate(data);
    console.log(error, value);
    if (error) {
      throw handleJoiErrorMessage(error);
    }

    return await servicerRepository.create(value);
  }

  async updateService(id, data) {
    const { error, value } = updateServiceScheme.validate(data);
    console.log(error, value);
    if (error) {
      throw handleJoiErrorMessage(error);
    }
    const updatedService = await servicerRepository.update(id, value);
    if (!updatedService) {
      throw new Error("Service not found");
    }
    return updatedService;
  }

  async deleteService(id) {
    const deletedService = await servicerRepository.delete(id);
    if (!deletedService) {
      throw new Error("Service not found");
    }
    return deletedService;
  }

  async updateStatus(id) {
    const updatedStatusService = await servicerRepository.updateStatus(id);
    if (!updatedStatusService) {
      throw new Error("Service not found");
    }
    return updatedStatusService;
  }
}

module.exports = new ServiceService();
