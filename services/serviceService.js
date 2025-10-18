const servicerRepository = require("../repositories/serviceRepository");
const {
  createServiceShema,
  updateServiceScheme,
} = require("../validations/serviceValidation");
const { handleJoiErrorMessage } = require("../utils/general");

class ServiceService {
  async getAll() {
    return await servicerRepository.findAll();
  }

  async getServiceById(id) {
    const service = await servicerRepository.findById(id);
    if (!service) throw new Error("Service not found");
    return service;
  }

  async createService(data) {
    const { error, value } = createServiceShema.validate(data);
    console.log(error, value);
    if (error) {
      throw handleJoiErrorMessage(error);
    }
  }
}
