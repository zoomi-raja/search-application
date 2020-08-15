const radisObj = require("../redis");
const fetch = require("node-fetch");

const expiryTime = 2 * 60 * 60;
const apiBastPath = "https://api.github.com";
exports.getSearchResults = async ({ entity, text }) => {
	let indexKey = `tradeling-search:${entity}:${text}`;
	let cacheBloob = await radisObj.get(indexKey);
	if (cacheBloob) {
		return JSON.parse(cacheBloob);
	} else {
		let rawResp = await fetch(
			`${apiBastPath}/search/${entity}?q=${text}+in:name`, //&page=35
			{ headers: { "Content-Type": "application/json" } }
		);
		let result = await rawResp.json();
		if (result.items && result.items.length > 0) {
			await await radisObj.setex(indexKey, expiryTime, JSON.stringify(result));
		}
		return result;
	}
};
