const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {authMiddleware} = require("../middleware/authMiddleware");

router.post("/login", authController.login);
router.post("/logout", authMiddleware, (req, res, next) => authController.logout(req, res, next));
router.post("/refresh-token", authMiddleware, (req, res, next) => authController.refreshToken(req, res, next));

module.exports = router;