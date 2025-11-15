const {Customer} = require("../models");

class CustomerRepository {
    async findAll(keyword) {
        if (keyword) {
            return await Customer.findAll({
                where: keyword
            });
        }
        return await Customer.findAll();
    }

    async findById(id) {
        return await Customer.findByPk(id);
    }

    async create(data) {
        return await Customer.create(data);
    }


    async update(id, data) {
        const user = await Customer.findByPk(id);
        if (!user) return null;
        await user.update(data);
        return user;
    }


    async delete(id) {
        const user = await Customer.findByPk(id);
        if (!user) return null;
        await user.destroy();
        return user;
    }
}

module.exports = new CustomerRepository();