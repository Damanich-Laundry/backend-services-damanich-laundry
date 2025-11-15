const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const errorMiddleware = require("./middleware/errorMiddleware");
const expressListEndpoints = require("express-list-endpoints");

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api/v1", routes);
app.use(errorMiddleware);

console.log(expressListEndpoints(routes));


app.listen(3000, () => console.log("🚀 Server running on port 3000"));
