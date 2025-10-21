const joi = require("joi");

exports.createInventorySchema = joi.object({
  item_name: joi.string().required(),
  category: joi.string(),
  quantity: joi.number(),
  unit: joi.string(),
  min_stock: joi.number(),
  price_per_unit: joi.number(),
  supplier: joi.string(),
  last_restock: joi.date(),
});

exports.updateInventorySchema = joi.object({
  item_name: joi.string(),
  category: joi.string(),
  quantity: joi.number(),
  unit: joi.string(),
  min_stock: joi.number(),
  price_per_unit: joi.number(),
  supplier: joi.string(),
  last_restock: joi.date(),
});

exports.createInventoryLogSchema = joi.object({
  inventory_id: joi.number().required(),
  type: joi.string().required(),
  quantity: joi.number().required(),
  notes: joi.string(),
});
