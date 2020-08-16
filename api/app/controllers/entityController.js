const HttpStatus = require("http-status-codes");
const { getGitEntities } = require("../services/entities");
/**will return available entites of GIT available on our system */
const entity = (req, res, next) => {
	let items = getGitEntities();
	const response = {
		status: "success",
		results: items.length,
		data: items,
	};
	res.status(HttpStatus.OK).json(response);
};
module.exports = entity;
