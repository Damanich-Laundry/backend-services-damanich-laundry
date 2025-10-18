require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const routes = require("./routes/index");
const notFound = require("./middleware/notFound");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Welcome to Laundry API",
    data: null,
  });
});

// Routes
app.use("/api/v1", routes);

app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
