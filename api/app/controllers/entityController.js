const { getGitEntities } = require("../utils/utils");
const entity = (req, res, next) => {
	let items = getGitEntities();
	const response = {
		status: "success",
		results: items.length,
		data: items,
	};
	res.status(200).json(response);
};
module.exports = entity;
