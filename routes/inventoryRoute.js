const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");
const { asyncHandler } = require("../utils/general");

router.get("/low-stock", inventoryController.getLowStock);
router.get("/:id/logs", inventoryController.getLogByInventoryId);
router.get("/", inventoryController.getAll);
router.get("/:id", inventoryController.getById);
router.post("/", asyncHandler(inventoryController.create));
router.patch("/:id", inventoryController.update);
router.delete("/:id", inventoryController.delete);
router.post("/:id/restock", asyncHandler(inventoryController.createRestock));

module.exports = router;
