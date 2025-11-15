const customerService = require("../services/customerService");

class CustomerController {
    async getAll(req, res) {
        try {
            const customers = await customerService.getAllCustomers();
            res.json(customers);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async getById(req, res) {
        try {
            const customer = await customerService.getCustomerById(req.params.id);
            if (!customer) return res.status(404).json({message: "Customer not found"});
            res.json(customer);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async create(req, res) {
        try {
            const customer = await customerService.createCustomer(req.body);
            res.status(201).json(customer);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async update(req, res) {
        try {
            const customer = await customerService.updateCustomer(req.params.id, req.body);
            if (!customer) return res.status(404).json({message: "Customer not found"});
            res.json(customer);
        } catch (err) {
            res.status(400).json(err);
        }
    }


    async delete(req, res) {
        try {
            const customer = await customerService.deleteCustomer(req.params.id);
            if (!customer) return res.status(404).json({message: "Customer not found"});
            res.json({message: "Customer deleted successfully"});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
}

module.exports = new CustomerController();
