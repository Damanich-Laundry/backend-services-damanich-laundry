const Joi = require("joi");

exports.createCustomerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().pattern(/^[0-9+]+$/).allow(null, ""),
    email: Joi.string().email().required(),
    address: Joi.string().min(3).max(100),
});

exports.updateCustomerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().pattern(/^[0-9+]+$/).allow(null, ""),
    email: Joi.string().email().required(),
    address: Joi.string().min(3).max(100),
});
