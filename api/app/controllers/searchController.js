const AppError = require("../utils/error");

const HttpStatus = require("http-status-codes");
const { catchAsync } = require("../utils/utils");
const { getAllResults } = require("../services/search");
const { getGitEntities } = require("../services/entities");
const { getResults } = require("../repo");

/** Validation function for search request requests
 *  can be moved to seprate folder but as its small project i put it here
 * */
const validateRequest = (body, required) => {
	let result = {
		status: true,
		message: "",
	};
	Object.keys(required).forEach((field) => {
		//sanitize
		body[field] = body[field] && body[field].trim();
		if (required[field].required && !body[field]) {
			result.status = false;
			result.message = `${field} value missing`;
		} else if (
			required[field].hasOwnProperty("values") &&
			!required[field].values.includes(body[field])
		) {
			result.status = false;
			result.message = `Invalid value for ${field}`;
		}
	});
	return result;
};

const search = catchAsync(async (req, res, next) => {
	/**Get GIT entities available in our system */

	let entities = getGitEntities();
	const { status, message } = validateRequest(req.body, {
		entity: {
			values: entities,
			required: true,
		},
		text: {
			required: true,
		},
	});
	//if validation fails
	if (!status) {
		next(new AppError(message, HttpStatus.UNPROCESSABLE_ENTITY));
	} else {
		const { entity, text, page } = req.body;
		//use repo to decide source of data cache/http request

		let indexKey = `tradeling-search:${entity}:${text}:${page}`;

		let result = await getResults({
			service: () => {
				//lexical scope in action
				return getAllResults({ entity, text, page });
			},
			indexKey,
		});
		//result response of api is very dynamic if items are there that means it went well
		if (result.hasOwnProperty("items")) {
			const response = {
				status: "success",
				results: result.total_count,
				data: { entity: entity, result: result.items },
			};
			res.status(HttpStatus.OK).json(response);
		} else {
			let message = result.message
				? result.message
				: "limited access sample App";
			next(new AppError(message, HttpStatus.UNPROCESSABLE_ENTITY));
		}
	}
});
module.exports = search;
