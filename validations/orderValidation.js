const Joi = require("joi");

const createOrderSchema = Joi.object({
  customer_id: Joi.number().integer().required(),
  payment_method: Joi.string().required(),
  estimated_done: Joi.date().optional().allow(null),
  pickup_date: Joi.date().optional().allow(null),
  status: Joi.string().optional(),
  payment_status: Joi.string().optional(),
  total_weight: Joi.number().optional(),
  discount: Joi.number().optional(),
  notes: Joi.string().optional().allow(null, ""),

  items: Joi.array()
    .items(
      Joi.object({
        service_id: Joi.number().integer().required(),
        quantity: Joi.number().integer().min(1).required(),
        notes: Joi.string().optional().allow(null, ""),
      })
    )
    .min(1)
    .required(),

  inventory_logs: Joi.array()
    .items(
      Joi.object({
        inventory_id: Joi.number().integer().required(),
        quantity: Joi.number().integer().min(1).required(),
        type: Joi.string().valid("IN", "OUT").optional(),
        notes: Joi.string().optional().allow(null, ""),
      })
    )
    .optional(),
});

module.exports = { createOrderSchema };
