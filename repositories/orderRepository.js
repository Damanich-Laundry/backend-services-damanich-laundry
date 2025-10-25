const {Order} = require("../models");

class orderRepository{
    async findAll(){
        return await Order.findAll();
    }

    async findById(id){
        return await Order.findByPk(id);
    }

    async create(data){
        
    }

}

module.exports = new orderRepository();