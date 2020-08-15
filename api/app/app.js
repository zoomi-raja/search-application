const express = require("express");
const router = require("./router");
const cors = require("./utils/cors");
const {
	globalErrorHandler,
	notFound,
} = require("./controllers/errorController");

//wireup express app
const app = express();
app.use(express.json({ limit: "10kb" }));
//whitelist required url from cors
app.use(cors());
// routes
app.use("/api", router);
// handle 404
app.use("*", notFound);
//each error cought will be passed to below middleware
app.use(globalErrorHandler);
module.exports = app;
