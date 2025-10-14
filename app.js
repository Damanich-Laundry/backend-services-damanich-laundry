const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoute");
const sequelize = require("./config/database");

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);


app.listen(3000, () => console.log("🚀 Server running on port 3000"));
