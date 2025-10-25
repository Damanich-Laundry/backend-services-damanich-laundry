const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoute");
const serviceRoutes = require("./serviceRoute");
const inventoryRoutes = require("./inventoryRoute");
const orderRoutes = require("./orderRoute");

// Gunakan prefix "/users" untuk semua endpoint user
router.use("/users", userRoutes);
router.use("/services", serviceRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/orders", orderRoutes);

module.exports = router;
