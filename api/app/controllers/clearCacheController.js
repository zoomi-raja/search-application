const { resetCache } = require("../services/search");
const AppError = require("../utils/error");
const HttpStatus = require("http-status-codes");
const clearCache = async (req, res, next) => {
	let resp = await resetCache();
	if (resp === "OK") {
		res.status(HttpStatus.OK).json({ status: "success" });
	} else {
		next(new AppError("Cache Issue", status.SERVICE_UNAVAILABLE));
	}
};
module.exports = clearCache;
