const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const router = require("./src/router/index");
const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("combined"));
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(router);

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, message: "server running" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
