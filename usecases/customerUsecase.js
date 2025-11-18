const bcrypt = require("bcryptjs");
const customerRepository = require("../repositories/customerRepository");
const {createCustomerSchema, updateCustomerSchema} = require("../validations/customerValidation");
const {handleJoiErrorMessage} = require("../utils/general");
const {NotFoundError} = require("../exceptions/errors");
const validator = require("./validationUsecase"); // instance

class CustomerUsecase {
    constructor({validator}) {
        this.validator = validator;
    }

    async getAllCustomers() {
        return await customerRepository.findAll();
    }

    async getCustomerById(id) {
        const user = await customerRepository.findById(id);
        if (!user) throw new NotFoundError("Customer not found");
        return user;
    }

    async createCustomer(data) {
        // 🔹 Validasi di layer service
        const value = this.validator.validateSchema(createCustomerSchema, data);

        return await customerRepository.create(value);
    }

    async updateCustomer(id, data) {
        // 🔹 Validasi dulu
        const {error, value} = updateCustomerSchema.validate(data);
        if (error) handleJoiErrorMessage(error);


        // 🔹 Update ke DB
        const updated = await customerRepository.update(id, value);
        if (!updated) throw new NotFoundError("Customer not found");

        return updated;
    }


    async deleteCustomer(id) {
        const deleted = await customerRepository.delete(id);
        if (!deleted) throw new NotFoundError("Customer not found");
        return deleted;
    }
}

module.exports = new CustomerUsecase({validator});
