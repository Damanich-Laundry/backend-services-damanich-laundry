const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const { asyncHandler } = require("../utils/general");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/", authMiddleware, customerController.getAll);
router.get("/:id", authMiddleware, customerController.getById);
router.post("/", authMiddleware, asyncHandler(customerController.create));
router.put("/:id", authMiddleware, customerController.update);
router.delete("/:id", authMiddleware, customerController.delete);

module.exports = router;
