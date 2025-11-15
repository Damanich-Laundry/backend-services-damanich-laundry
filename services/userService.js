const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/userRepository");
const {createUserSchema, updateUserSchema} = require("../validations/userValidation");
const {handleJoiErrorMessage} = require("../utils/general");

class UserService {
    async getAllUsers() {
        return await userRepository.findAll();
    }

    async getUserById(id) {
        const user = await userRepository.findById(id);
        if (!user) throw new Error("User not found");
        return user;
    }

    async createUser(data) {
        // 🔹 Validasi di layer service
        const {error, value} = createUserSchema.validate(data);
        console.log(error, value);
        if (error) {
            throw handleJoiErrorMessage(error);
        }

        // 🔹 Hash password
        const hashedPassword = await bcrypt.hash(value.password, 10);
        const userData = {...value, password_hash: hashedPassword};
        delete userData.password;

        return await userRepository.create(userData);
    }

    async updateUser(id, data) {
        // 🔹 Validasi dulu
        const {error, value} = updateUserSchema.validate(data);
        if (error) throw new Error(error.details[0].message);

        // 🔹 Password (optional)
        if (value.password) {
            value.password_hash = await bcrypt.hash(value.password, 10);
            delete value.password;
        }

        // 🔹 Update ke DB
        const updated = await userRepository.update(id, value);
        if (!updated) throw new Error("User not found");

        return updated;
    }

    async updateStatus(id) {
        let user = await userRepository.updateStatus(id);
        if (!user) throw new Error("User not found");
        return user;
    }

    async deleteUser(id) {
        const deleted = await userRepository.delete(id);
        if (!deleted) throw new Error("User not found");
        return deleted;
    }
}

module.exports = new UserService();
