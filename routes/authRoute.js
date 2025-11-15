const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {authMiddleware} = require("../middleware/authMiddleware");

router.post("/login", authController.login);
router.post("/logout", (req, res, next) => authController.logout(req, res, next));
router.post("/refresh-token", (req, res, next) => authController.refreshToken(req, res, next));
router.get("/me", authMiddleware, (req, res, next) => authController.getProfile(req, res, next));
router.put("/change-password", authMiddleware, (req, res, next) => authController.changePassword(req, res, next));

module.exports = router;