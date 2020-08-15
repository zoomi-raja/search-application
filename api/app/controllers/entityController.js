const { getGitEntities } = require("../utils/utils");
const entity = (req, res, next) => {
	let items = getGitEntities();
	res.setHeader("Content-Type", "application/json");
	const response = {
		status: "success",
		results: items.length,
		data: items,
	};
	res.status(200).json(response);
};
module.exports = entity;
