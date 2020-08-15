exports.unhandledError = (server, serverStarted = false) => {
	return (err) => {
		// Log the errors
		console.error(err);

		// If server has started, close it down
		if (serverStarted) {
			server.close(function () {
				process.exit(1);
			});
		}
	};
};

exports.getGitEntities = () => ["users", "repositories"];
