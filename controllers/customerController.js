const customerUsecaseClass = require("../usecases/customerUsecase");
const {successResponse, errorResponse} = require("../utils/responseHelpers");
const validator = require("../usecases/validationUsecase"); // instance
const customerUsecase = new customerUsecaseClass({validator});

class CustomerController {
    async getAll(req, res, next) {
        try {
            const customers = await customerUsecase.getAllCustomers();
            return successResponse(res, "Customers fetched successfully", customers);
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const customer = await customerUsecase.getCustomerById(req.params.id);
            return successResponse(res, "Customers fetched successfully", customer);
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const customer = await customerUsecase.createCustomer(req.body);
            return successResponse(res, null, customer, 201);
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const customer = await customerUsecase.updateCustomer(
                req.params.id,
                req.body
            );
            return successResponse(res, null, customer);
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const customer = await customerUsecase.deleteCustomer(req.params.id);
            return successResponse(res, null, customer);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CustomerController();
