const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/userRepository");

class UserService {
    async getAllUsers() {
        return await userRepository.findAll();
    }

    async getUserById(id) {
        return await userRepository.findById(id);
    }

    async createUser(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const userData = {...data, password_hash: hashedPassword};
        delete userData.password; // hapus plain password
        return await userRepository.create(userData);
    }

    async updateUser(id, data) {
        if (data.password) {
            data.password_hash = await bcrypt.hash(data.password, 10);
            delete data.password;
        }
        return await userRepository.update(id, data);
    }

    async deleteUser(id) {
        return await userRepository.delete(id);
    }
}

module.exports = new UserService();
