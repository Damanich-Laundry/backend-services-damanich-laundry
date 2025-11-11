const { OrderItem } = require("../models");

class orderItemRepository {
  async create(data, options = {}) {
    return await OrderItem.create(data, options);
  }
}
module.exports = new orderItemRepository();
