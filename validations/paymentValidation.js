const Joi = require("joi");

const createPaymentSchema = Joi.object({
  order_id: Joi.number().integer().required(),

  amount: Joi.number().positive().required(),

  payment_method: Joi.string().required(),

  status: Joi.string().valid("PENDING", "SUCCESS", "FAILED").default("PENDING"),

  payment_date: Joi.date().optional(),

  notes: Joi.string().optional().allow(null, ""),
});

const updatePaymentSchema = Joi.object({
  amount: Joi.number().positive().optional(),

  payment_method: Joi.string().optional(),

  status: Joi.string().valid("PENDING", "SUCCESS", "FAILED").optional(),

  notes: Joi.string().optional().allow(null, ""),
});

module.exports = {
  createPaymentSchema,
  updatePaymentSchema,
};
