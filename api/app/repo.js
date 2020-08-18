const radisObj = require("./utils/redis");
const AppError = require("./utils/error");
const expiryTime = 2 * 60 * 60;

/**added extra layer on top fetching data from git api as if any other
 * object also need cache it can implement getAllResults method to fully
 * utilitze this function */

exports.getResults = async ({ service, indexKey = null }) => {
	try {
		let cacheBloob = await radisObj.get(indexKey);
		if (cacheBloob) {
			return JSON.parse(cacheBloob);
		} else {
			//get service data and put it in cache
			const result = await service();
			if (result.items && result.items.length > 0) {
				await radisObj.setex(indexKey, expiryTime, JSON.stringify(result));
			}
			return result;
		}
	} catch (err) {
		throw new AppError(err.message, 500);
	}
};

/**function to reset cache */
exports.resetCache = async () => {
	return await radisObj.flushdb();
};
