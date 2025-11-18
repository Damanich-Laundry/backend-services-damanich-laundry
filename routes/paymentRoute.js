const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");
const { authMiddleware } = require("../middleware/authMiddleware");
const isStaff = require("../middleware/isStaff");
const { asyncHandler } = require("../utils/general");

router.get(
  "/",
  authMiddleware,
  isStaff,
  asyncHandler(paymentController.getAll)
);
router.get(
  "/:id",
  authMiddleware,
  isStaff,
  asyncHandler(paymentController.getById)
);
router.get(
  "/order/:orderId",
  authMiddleware,
  isStaff,
  asyncHandler(paymentController.getByOrder)
);

router.post(
  "/",
  authMiddleware,
  isStaff,
  asyncHandler(paymentController.create)
);
router.put(
  "/:id",
  authMiddleware,
  isStaff,
  asyncHandler(paymentController.update)
);

module.exports = router;
