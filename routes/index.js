const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoute");
const serviceRoutes = require("./serviceRoute");

// Gunakan prefix "/users" untuk semua endpoint user
router.use("/users", userRoutes);
router.use("/services", serviceRoutes);

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
