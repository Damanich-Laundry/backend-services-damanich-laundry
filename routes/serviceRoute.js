const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const { asyncHandler } = require("../utils/general");

router.get("/", serviceController.getAll);
router.get("/:id", serviceController.getById);
router.post("/", asyncHandler(serviceController.create));
router.patch("/:id", serviceController.update);
router.delete("/:id", serviceController.delete);
router.patch("/:id/toggle-status", serviceController.updateStatus);

module.exports = router;
