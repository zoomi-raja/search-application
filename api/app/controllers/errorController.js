/**Error controller will try to catch all errors in our req/res cycle and will prepare
 * json response accordingly both production and dev object properties varies to carry additional
 * data for debuging purpose in dev env and for prouction environment details will be in log
 */
const AppError = require("../utils/error");
/**added trace for dev helps in tracking down the cause of issue */
const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};
/**prepare error response for production response */
const sendErrorProd = (err, res) => {
	// 1) Log error
	console.error("ERROR 💥", err);
	// 2) Send generic message
	res.status(500).json({
		status: "error",
		message: "Something went very wrong!",
	});
};

/**main Error handler utilizing above methods */
exports.globalErrorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";
	process.env.NODE_ENV === "development"
		? sendErrorDev(err, res)
		: sendErrorProd(err, res);
};

/**handler to prepare error for route not found */
exports.notFound = (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl}`, 400));
};
