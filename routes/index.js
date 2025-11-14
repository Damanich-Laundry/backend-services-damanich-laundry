const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoute");
const serviceRoutes = require("./serviceRoute");
const authRoutes = require("./authRoute");

router.use("/users", userRoutes);
router.use("/services", serviceRoutes);
router.use("/authentications", authRoutes);

module.exports = router;
