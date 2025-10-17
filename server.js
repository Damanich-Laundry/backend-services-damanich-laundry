require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const routes = require("./routes/index");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/v1", routes); // 👈 semua routes dikumpulkan di bawah /api

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
