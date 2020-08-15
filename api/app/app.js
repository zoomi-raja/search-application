const express = require("express");
const router = require("./router");
const cors = require("../utils/cors");
const notFound = require("../controllers/notfoundController");
const globalErrorHandler = require("../controllers/errorController");

//wireup express app
const app = express();
app.use(express.json({ limit: "10kb" }));
//whitelist required url from cors
app.use(cors());
// routes
app.use("/api", router);
// handle 404
app.use("*", notFound);
app.use(globalErrorHandler);
module.exports = app;
