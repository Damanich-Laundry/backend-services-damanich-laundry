const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const routes = require("./routes/index");
const notFound = require("./middleware/notFound");
const errorMiddleware = require("./middleware/errorMiddleware");
const expressListEndpoints = require("express-list-endpoints");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Welcome to Laundry API",
        data: null,
    });
});
app.use("/api/v1", routes);
app.use(errorMiddleware);
app.use(notFound);
console.log(expressListEndpoints(routes));


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
