const fetch = require("node-fetch");

const apiBastPath = "https://api.github.com";

/** Preparing query params for git API */
const prepareQueryParam = (entity = "") => {
	let q = "";
	switch (entity) {
		case "issues":
			q = `type:issue`;
			break;
		case "repositories":
			q = `in:name,description`;
			break;
		default:
			q = `in:name`;
	}
	return q;
};

/** No need to hold all data returned by GIT just holding the keys we need */
const senitiseData = (arObj = [], entity = "") => {
	switch (entity) {
		case "repositories":
			arObj = arObj.map(
				({
					id,
					name,
					full_name,
					description,
					created_at,
					svn_url,
					stargazers_count,
					language,
					forks,
					open_issues,
					watchers,
					owner: {
						login,
						id: user_id,
						avatar_url,
						html_url: user_html_url,
						type,
					},
				}) => ({
					id,
					name,
					full_name,
					description,
					created_at,
					svn_url,
					stargazers_count,
					language,
					forks,
					open_issues,
					watchers,
					owner: {
						login,
						id: user_id,
						avatar_url,
						html_url: user_html_url,
						type,
					},
				})
			);
			break;
		case "users":
			arObj = arObj.map(({ login, id, avatar_url, html_url, type }) => ({
				login,
				id,
				avatar_url,
				html_url,
				type,
			}));
			break;
		case "issues":
			arObj = arObj.map(
				({
					html_url,
					id,
					title,
					state,
					created_at,
					body,
					user: {
						login,
						id: user_id,
						avatar_url,
						html_url: user_html_url,
						type,
					},
				}) => ({
					html_url,
					id,
					title,
					state,
					created_at,
					body,
					user: {
						login,
						id: user_id,
						avatar_url,
						html_url: user_html_url,
						type,
					},
				})
			);
			break;
	}
	return arObj;
};

/** main function to make http request to fetch data from GIT */
exports.getAllResults = async ({ entity, text, page }) => {
	page = Number.isInteger(parseInt(page)) ? page : 1;

	let q = prepareQueryParam(entity);
	let gitApi = `${apiBastPath}/search/${entity}?q=${encodeURI(
		text
	)}+${q}&page=${page}`;
	if (process.env.NODE_ENV === "development") {
		console.log(gitApi);
	}
	let rawResp = await fetch(gitApi);
	let result = await rawResp.json();
	if (result.items) {
		result.items = senitiseData([...result.items], entity);
	}
	return result;
};
