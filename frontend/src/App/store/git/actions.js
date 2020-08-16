import _ from "lodash";

import config from "../../../config";

import * as actionTypes from "./actionTypes";
import { reduxCatchAsync } from "../../utility/utility";

export const toggleLoading = () => ({
	type: actionTypes.LOADING,
});

/**set current selected entity as string */
export const setEntity = (entity) => ({
	type: actionTypes.SET_ENTITY,
	entity,
});

/**Array of entites available in our system fetched from api */
export const setEntities = ({ entity, entities }) => ({
	type: actionTypes.SET_ENTITIES,
	entity,
	entities,
});

/** action to compensate data fetched through api */
export const dataFetched = ({ entity = "", result }, text = "") => ({
	type: actionTypes.FETCHED_DATA,
	entity,
	result,
	text,
});

export const setError = (msg = "") => ({
	type: actionTypes.SET_ERROR,
	errMessage: msg,
});

export const clearError = () => ({
	type: actionTypes.CLEAR_ERROR,
});

//set data from indexer to current store data
export const setData = ({ entity, text, indexer: data = [] }) => ({
	type: actionTypes.SET_DATA,
	entity,
	text,
	data,
});

//clear current loaded data from store data property
export const clearData = () => ({
	type: actionTypes.CLEAR_DATA,
});
//set inital state of store
export const clearCache = () => ({
	type: actionTypes.CLEAR_CACHE,
});

/*main function to fetch data from api if not available in local chache */
export const fetchGitData = ({
	entity = "",
	text = "",
	indexer = {},
	page = 1,
}) => {
	if (_.has(indexer, entity) && _.has(indexer[entity], text) && page < 2) {
		return setData({ entity, text, indexer: indexer[entity][text] });
	} else {
		return reduxCatchAsync(async (dispatch) => {
			dispatch(toggleLoading());
			let postData = {
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({ entity, text, page }),
			};
			let rawResp = await fetch(`${config.API_URL}/search`, postData);
			let response = await rawResp.json();
			if (rawResp.status === 200) {
				dispatch(dataFetched(response.data, text));
			} else {
				dispatch(setError(response.message || ""));
			}
		}, setError);
	}
};
/*set initial intities*/
export const initEntities = () => {
	return reduxCatchAsync(async (dispatch) => {
		dispatch(toggleLoading());
		let rawResp = await fetch(`${config.API_URL}/entities`);
		let response = await rawResp.json();
		if (rawResp.status === 200) {
			let apiEntities = response.data;
			//just to make sure wo dont miss entities on start up
			if (apiEntities[0] === "") {
				apiEntities = [{ value: "users" }, { value: "repositories" }];
			}
			dispatch(setEntities({ entity: apiEntities[0], entities: apiEntities }));
		} else {
			dispatch(setError(response.message || ""));
		}
	}, setError);
};

/** reset cache from both end */
export const flushCache = () => {
	return reduxCatchAsync(async (dispatch) => {
		dispatch(toggleLoading());
		await fetch(`${config.API_URL}/clear-cache`, {
			method: "DELETE",
		});
		dispatch(clearCache());
	});
};
