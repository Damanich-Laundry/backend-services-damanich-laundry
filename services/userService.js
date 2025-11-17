const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/userRepository");
const {createUserSchema, updateUserSchema} = require("../validations/userValidation");
const {handleJoiErrorMessage, handleSequelizeError} = require("../utils/general");
const {NotFoundError} = require("../exceptions/errors");
const validator = require("./ValidationService"); // instance

class UserService {
    constructor({validator}) {
        this.validator = validator;
    }

    async getAllUsers() {
        return await userRepository.findAll();
    }

    async getUserById(id) {
        const user = await userRepository.findById(id);
        if (!user) throw new Error("User not found");
        return user;
    }

    async getProfile(userId) {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw NotFoundError("User not found");
        }
        return user;
    }

    async createUser(data) {
        // 🔹 Validasi di layer service
        const {error, value} = this.validator.validateSchema(createUserSchema, data);
        if (error) {
            throw handleJoiErrorMessage(error);
        }

        // 🔹 Hash password
        const hashedPassword = await bcrypt.hash(value.password, 10);
        const userData = {...value, password_hash: hashedPassword};
        delete userData.password;
        try {
            return await userRepository.create(userData);
        } catch (err) {
            throw handleSequelizeError(err);
        }
    }

    async updateUser(id, data) {
        // 🔹 Validasi dulu
        const {error, value} = updateUserSchema.validate(data);
        if (error) {
            throw handleJoiErrorMessage(error);
        }
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
        if (!user) throw new NotFoundError("User not found");
        return user;
    }

    async deleteUser(id) {
        const deleted = await userRepository.delete(id);
        if (!deleted) {
            throw new NotFoundError("User not found")
        }
        return deleted;
    }
}

module.exports = new UserService({validator}); // inject dependency sebagai object
