const AppError = require("../utils/error");

const { resetCache } = require("../repo");
const HttpStatus = require("http-status-codes");
const { catchAsync } = require("../utils/utils");

/**function to clear cache. catchAsync just to avoid aditional set of brackets */
const clearCache = catchAsync(async (req, res, next) => {
	let resp = await resetCache();
	if (resp === "OK") {
		res.status(HttpStatus.OK).json({ status: "success" });
	} else {
		next(new AppError("Cache Issue", status.SERVICE_UNAVAILABLE));
	}
});
module.exports = clearCache;
