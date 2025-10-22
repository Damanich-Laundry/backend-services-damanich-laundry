const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoute");
const inventoryRoutes = require("./inventoryRoute");

// Gunakan prefix "/users" untuk semua endpoint user
// router.use("/users", userRoutes);
router.use("/inventory", inventoryRoutes);

module.exports = router;
