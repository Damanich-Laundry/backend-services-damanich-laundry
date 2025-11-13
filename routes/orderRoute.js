const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { asyncHandler } = require("../utils/general");
const isStaff = require("../middleware/isStaff");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/", orderController.getAll);
router.get("/search", asyncHandler(orderController.search));
router.get("/:id", orderController.getById);
router.get("/:id/invoice", asyncHandler(orderController.getInvoice));

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
