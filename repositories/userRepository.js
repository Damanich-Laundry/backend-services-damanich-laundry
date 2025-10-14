const {User} = require("../models");

class UserRepository {
    async findAll() {
        return await User.findAll();
    }

    async findById(id) {
        return await User.findByPk(id);
    }

    async create(data) {
        return await User.create(data);
    }

    async update(id, data) {
        const user = await User.findByPk(id);
        if (!user) return null;
        await user.update(data);
        return user;
    }

    async updateStatus(id) {
        const user = await User.findByPk(id);
        if (!user) return null;
        console.log(user)
        await user.update({
            is_active: !user.is_active,
        });
        return user;
    }

    async delete(id) {
        const user = await User.findByPk(id);
        if (!user) return null;
        await user.destroy();
        return user;
    }
}

module.exports = new UserRepository();
