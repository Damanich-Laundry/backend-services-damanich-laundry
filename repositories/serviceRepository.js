const { Service } = require("../models");

class ServiceRepository {
  async findAll() {
    return await Service.findAll();
  }

  async findById(id) {
    return await Service.findByPk(id);
  }

  async create(data) {
    return await Service.create(data);
  }

  async update(id, data) {
    const service = await Service.findByPk(id);
    if (!service) return null;
    await service.update(data);
    return service;
  }

  async delete(id) {
    const service = await Service.findByPk(id);
    if (!service) return null;
    await service.destroy();
    return service;
  }

  async updateStatus(id) {
    const service = await Service.findByPk(id);
    if (!service) return null;
    await service.update({ is_active: !service.is_active });
    return service;
  }
}

module.exports = new ServiceRepository();
