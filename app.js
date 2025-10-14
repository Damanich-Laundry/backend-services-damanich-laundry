const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api/v1", routes); // 👈 semua routes dikumpulkan di bawah /api


app.listen(3000, () => console.log("🚀 Server running on port 3000"));
