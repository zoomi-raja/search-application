const fetch = require("node-fetch");
const apiBastPath = "https://api.github.com";

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
exports.getAllResults = async ({ entity, text, page }) => {
	page = Number.isInteger(parseInt(page)) ? page : 1;

	let q = prepareQueryParam(entity);
	let rawResp = await fetch(
		`${apiBastPath}/search/${entity}?q=${text}+${q}&page=${page}`
	);
	let result = await rawResp.json();
	if (result.items) {
		result.items = senitiseData([...result.items], entity);
	}
	return result;
};
