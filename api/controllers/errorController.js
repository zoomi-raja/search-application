const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};
const sendErrorProd = (err, res) => {
	// 1) Log error
	console.error("ERROR 💥", err);
	// 2) Send generic message
	res.status(500).json({
		status: "error",
		message: "Something went very wrong!",
	});
};
module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";
	process.env.NODE_ENV === "development"
		? sendErrorDev(err, res)
		: sendErrorProd(err, res);
};
