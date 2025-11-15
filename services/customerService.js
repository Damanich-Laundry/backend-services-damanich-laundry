const bcrypt = require("bcryptjs");
const customerRepository = require("../repositories/customerRepository");
const {createCustomerSchema, updateCustomerSchema} = require("../validations/userValidation");
const {handleJoiErrorMessage} = require("../utils/general");

class CustomerService {
    async getAllCustomers() {
        return await customerRepository.findAll();
    }

    async getCustomerById(id) {
        const user = await customerRepository.findById(id);
        if (!user) throw new Error("Customer not found");
        return user;
    }

    async createCustomer(data) {
        // 🔹 Validasi di layer service
        const {error, value} = createCustomerSchema.validate(data);
        console.log(error, value);
        if (error) {
            throw handleJoiErrorMessage(error);
        }

        // 🔹 Hash password
        const hashedPassword = await bcrypt.hash(value.password, 10);
        const userData = {...value, password_hash: hashedPassword};
        delete userData.password;

        return await customerRepository.create(userData);
    }

    async updateCustomer(id, data) {
        // 🔹 Validasi dulu
        const {error, value} = updateCustomerSchema.validate(data);
        if (error) throw new Error(error.details[0].message);

        // 🔹 Password (optional)
        if (value.password) {
            value.password_hash = await bcrypt.hash(value.password, 10);
            delete value.password;
        }

        // 🔹 Update ke DB
        const updated = await customerRepository.update(id, value);
        if (!updated) throw new Error("Customer not found");

        return updated;
    }


    async deleteCustomer(id) {
        const deleted = await customerRepository.delete(id);
        if (!deleted) throw new Error("Customer not found");
        return deleted;
    }
}

module.exports = new CustomerService();
