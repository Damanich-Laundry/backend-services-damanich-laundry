const orderRepository = require("../repositories/orderRepository");

class orderService{
    async getAllOrder(){
        return await orderRepository.findAll();
    }

    async getOrderById(id){
        return await orderRepository.findById(id);
    }
}

module.exports = new orderService();