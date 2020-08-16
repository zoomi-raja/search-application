/**this handler is used on service level is error is not cought so log the error and
 * properly shutdown server there will be no api response */

exports.unhandledError = (server, serverStarted = false) => {
	return (err) => {
		// Log the errors
		console.error(err);

		// If server has started, close it down
		if (serverStarted) {
			server.close(function () {
				process.exit(1);
			});
		} else {
			process.exit(1);
		}
	};
};
exports.catchAsync = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((err) => next(err));
	};
};
