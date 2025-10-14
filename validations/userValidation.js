const Joi = require("joi");

exports.createUserSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    full_name: Joi.string().allow(null, ""),
    role: Joi.string().valid("admin", "staff", "customer").default("staff"),
    phone: Joi.string().pattern(/^[0-9+]+$/).allow(null, ""),
});

exports.updateUserSchema = Joi.object({
    username: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    full_name: Joi.string().allow(null, ""),
    role: Joi.string().valid("admin", "staff", "customer"),
    phone: Joi.string().pattern(/^[0-9+]+$/).allow(null, ""),
});
