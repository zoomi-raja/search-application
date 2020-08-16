const express = require("express");
const router = require("./router");
const cors = require("./utils/cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const {
	globalErrorHandler,
	notFound,
} = require("./controllers/errorController");

//wireup express app
const app = express();
app.use(express.json({ limit: "10kb" }));
//whitelist required url from cors
app.use(cors());
// swagger
const options = require("./swagger.json");
const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerSpec));
// routes
app.use("/api", router);
// handle 404
app.use("*", notFound);
//each error cought will be passed to below middleware
app.use(globalErrorHandler);
module.exports = app;
