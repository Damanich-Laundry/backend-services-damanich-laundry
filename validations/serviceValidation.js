const joi = require("joi");

exports.createServiceScheme = joi.object({
  service_name: joi.string().min(3).max(30).required(),
  service_type: joi.string().valid("reguler", "express"),
  unit: joi.string(),
  price_per_unit: joi.number().positive(),
  duration_hours: joi.number().positive(),
});

exports.updateServiceScheme = joi.object({
  service_name: joi.string().min(3).max(30),
  service_type: joi.string().valid("reguler", "express"),
  unit: joi.string(),
  price_per_unit: joi.number().positive(),
  duration_hours: joi.number().positive(),
});
