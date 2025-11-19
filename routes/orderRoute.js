const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { asyncHandler } = require("../utils/general");
const isStaff = require("../middleware/isStaff");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/", authMiddleware, orderController.getAll);
router.get("/filter", authMiddleware, orderController.getOrdersByDateRange);
router.get("/search", authMiddleware, asyncHandler(orderController.search));
router.get("/:id", authMiddleware, orderController.getById);
router.get(
  "/:id/invoice",
  authMiddleware,
  asyncHandler(orderController.getInvoice)
);

router.post("/", authMiddleware, isStaff, asyncHandler(orderController.create));
router.patch(
  "/:id",
  authMiddleware,
  isStaff,
  asyncHandler(orderController.update)
);
router.delete(
  "/:id",
  authMiddleware,
  isStaff,
  asyncHandler(orderController.delete)
);
router.patch(
  "/:id/status",
  authMiddleware,
  isStaff,
  asyncHandler(orderController.updateStatus)
);

module.exports = router;
