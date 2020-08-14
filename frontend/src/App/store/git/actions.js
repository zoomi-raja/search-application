import _ from "lodash";
import * as actionTypes from "./actionTypes";
import { reduxCatchAsync } from "../../utility/utility";

export const toggleLoading = () => ({
	type: actionTypes.LOADING,
});

export const setEntity = (entity) => ({
	type: actionTypes.SET_ENTITY,
	entity,
});

export const setEntities = (entity, entities) => ({
	type: actionTypes.SET_ENTITIES,
	entity,
	entities,
});
export const dataFetched = (data = [], text = "") => ({
	type: actionTypes.FETCHED_DATA,
	data,
	text,
});

export const setError = (msg = "") => ({
	type: actionTypes.SET_ERROR,
	errMessage: msg,
});

export const clearError = () => ({
	type: actionTypes.CLEAR_ERROR,
});

export const setData = (entity, text, data = []) => ({
	type: actionTypes.SET_DATA,
	entity,
	text,
	data,
});
export const clearData = () => ({
	type: actionTypes.CLEAR_DATA,
});
/*main function to fetch data from api if not available in local chache */
export const fetchGitData = (entity = "", text = "", indexer = {}) => {
	if (_.has(indexer, entity) && _.has(indexer[entity], text)) {
		return setData(entity, text, indexer[entity][text]);
	} else {
		console.log(entity, indexer, _.has(indexer[entity], text));
		return reduxCatchAsync(async (dispatch) => {
			dispatch(toggleLoading());
			let postData = {
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({ entity, text }),
			};
			let rawResp = await fetch("http://localhost:8010/api/search", postData);
			let response = await rawResp.json();
			if (rawResp.status === 200) {
				dispatch(dataFetched(response.data, text));
			} else {
				dispatch(setError(response.message));
			}
		}, setError);
	}
};
