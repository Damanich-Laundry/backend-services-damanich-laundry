const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { asyncHandler } = require("../utils/general");
const isStaff = require("../middleware/isStaff");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);
router.post("/", authMiddleware, isStaff, asyncHandler(orderController.create));

module.exports = router;
