const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const { asyncHandler } = require("../utils/general");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/", serviceController.getAll);
router.get("/:id", serviceController.getById);
router.post("/", authMiddleware, asyncHandler(serviceController.create));
router.patch("/:id", authMiddleware, serviceController.update);
router.delete("/:id", authMiddleware, serviceController.delete);
router.patch(
  "/:id/toggle-status",
  authMiddleware,
  serviceController.updateStatus
);

module.exports = router;
