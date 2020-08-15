const clearCache = (req, res, next) => {
	res.status(200).json({ peep: "helllop" });
};
module.exports = clearCache;
