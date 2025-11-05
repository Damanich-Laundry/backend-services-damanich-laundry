const { OrderItem } = require("../models");

class orderItemRepository {
  async create(data) {
    return await OrderItem.create(data);
  }
}

module.exports = new orderItemRepository();
