const cors = require("cors");
const allowedOrigins = ["http://localhost", "http://localhost:8010"];
const setCors = () => {
	if (process.env.WHITELIST_DOMAIN)
		allowedOrigins.push(process.env.WHITELIST_DOMAIN);

	return cors({
		origin: (origin, callback) => {
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) {
				console.log(origin);
				const msg =
					"The CORS policy for this site does not " +
					"allow access from the specified Origin.";
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
	});
};
module.exports = setCors;
