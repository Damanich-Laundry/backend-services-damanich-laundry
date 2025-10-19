const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoute");
const serviceRoutes = require("./serviceRoute");

// Gunakan prefix "/users" untuk semua endpoint user
router.use("/users", userRoutes);
router.use("/services", serviceRoutes);

module.exports = router;
