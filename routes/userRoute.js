const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {asyncHandler} = require("../utils/general");
const {authMiddleware} = require("../middleware/authMiddleware");
const {authorizeAdmin} = require("../middleware/isAdminMiddleware");

router.get("/", authMiddleware, authorizeAdmin, userController.getAll);
router.get("/me", authMiddleware, userController.getProfile);
router.get("/:id", userController.getById);
router.post("/", authMiddleware, authorizeAdmin, userController.create);
router.put("/:id", userController.update);
router.put("/:id/toggle-status", userController.updateStatus);
router.delete("/:id", asyncHandler(userController.delete));
router.put("/change-password", authMiddleware, (req, res, next) => authController.changePassword(req, res, next));

module.exports = router;
