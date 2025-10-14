const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoute");

// Gunakan prefix "/users" untuk semua endpoint user
router.use("/users", userRoutes);


module.exports = router;
