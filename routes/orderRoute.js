const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { asyncHandler } = require("../utils/general");

router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);

module.exports = router;
