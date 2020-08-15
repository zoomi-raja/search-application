const AppError = require("../utils/error");
const notFound = (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl}`, 400));
};
module.exports = notFound;
