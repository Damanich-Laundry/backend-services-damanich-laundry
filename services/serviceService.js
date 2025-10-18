const servicerRepository = require("../repositories/serviceRepository");
const {
  updateServiceSchema,
  createServiceScheme,
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

  async updateService(data) {}
}

module.exports = new ServiceService();
