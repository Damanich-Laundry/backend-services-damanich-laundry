const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");
const { asyncHandler } = require("../utils/general");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/low-stock", authMiddleware, inventoryController.getLowStock);
router.get(
  "/:id/logs",
  authMiddleware,
  inventoryController.getLogByInventoryId
);
router.get("/", authMiddleware, inventoryController.getAll);
router.get("/:id", authMiddleware, inventoryController.getById);
router.post("/", authMiddleware, asyncHandler(inventoryController.create));
router.patch("/:id", authMiddleware, inventoryController.update);
router.delete("/:id", authMiddleware, inventoryController.delete);
router.post(
  "/:id/restock",
  authMiddleware,
  asyncHandler(inventoryController.createRestock)
);

module.exports = router;
