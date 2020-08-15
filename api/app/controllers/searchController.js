const AppError = require("../utils/error");
const HttpStatus = require("http-status-codes");
const { getGitEntities, catchAsync } = require("../utils/utils");
const { getSearchResults } = require("../services/search");

const validateRequest = (body) => {
	let result = {
		status: true,
		message: "",
	};
	let entities = getGitEntities();
	//sanitize
	body.text = body.hasOwnProperty("text") ? body.text.trim() : "";
	body.entity = body.hasOwnProperty("entity") ? body.entity.trim() : "";

	if (body.text == "") {
		result.status = false;
		result.message = `Search text missing`;
	} else if (body.entity == "" || !entities.includes(body.entity)) {
		result.status = false;
		result.message = `Invalid Entity type`;
	}
	return result;
};

const search = catchAsync(async ({ body }, res, next) => {
	const { status, message } = validateRequest(body);
	if (!status) {
		next(new AppError(message, HttpStatus.UNPROCESSABLE_ENTITY));
	} else {
		const { entity, text, page = 1 } = body;
		let result = await getSearchResults({ entity, text, page });
		if (result.hasOwnProperty("items")) {
			const response = {
				status: "success",
				results: result.total_count,
				data: { entity: entity, result: result.items },
			};
			res.status(200).json(response);
		} else {
			let message = result.message
				? result.message
				: "limited access sample App";
			next(new AppError(message, HttpStatus.UNPROCESSABLE_ENTITY));
		}
	}
});
module.exports = search;
