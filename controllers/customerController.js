const customerService = require("../services/customerService");
const {successResponse, errorResponse} = require("../utils/responseHelpers");

class CustomerController {
    async getAll(req, res, next) {
        try {
            const customers = await customerService.getAllCustomers();
            return successResponse(res, "Customers fetched successfully", customers);
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const customer = await customerService.getCustomerById(req.params.id);
            return successResponse(res, "Customers fetched successfully", customer);
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const customer = await customerService.createCustomer(req.body);
            return successResponse(res, null, customer, 201);
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const customer = await customerService.updateCustomer(req.params.id, req.body);
            return successResponse(res, null, customer);
        } catch (err) {
            next(err);
        }
    }


    async delete(req, res, next) {
        try {
            const customer = await customerService.deleteCustomer(req.params.id);
            return successResponse(res, null, customer);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CustomerController();
