const { getGitEntities } = require("../services/entities");
const HttpStatus = require("http-status-codes");
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
