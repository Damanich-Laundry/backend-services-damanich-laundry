const express = require("express");
const router = express.Router();
const { sequelize } = require("../models");

const authRoutes = require("./authRoute");
const userRoutes = require("./userRoute");
const serviceRoutes = require("./serviceRoute");
const inventoryRoutes = require("./inventoryRoute");
const orderRoutes = require("./orderRoute");

// Gunakan prefix "/users" untuk semua endpoint user
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/services", serviceRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/orders", orderRoutes);

router.use("/users", userRoutes);
router.use("/services", serviceRoutes);
router.use("/authentications", authRoutes);

// Endpoint ping
router.get("/ping", (req, res) => {
    res.json({ status: "ok", message: "pong" });
});

// Endpoint cek DB
router.get("/db-check", async (req, res) => {
    try {
        await sequelize.authenticate();
        res.status(200).json({
            status: "ok",
            message: "Database connection successful"
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Database connection failed",
            error: err.message
        });
    }
});

module.exports = router;
