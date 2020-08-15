const { resetCache } = require("../services/search");
const clearCache = async (req, res, next) => {
	await resetCache();
	res.status(200).json({ status: "success" });
};
module.exports = clearCache;
