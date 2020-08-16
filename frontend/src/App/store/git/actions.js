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
				dispatch(setError(response.message || ""));
			}
		}, setError);
	}
};
/*set initial intities*/
export const initEntities = () => {
	return reduxCatchAsync(async (dispatch) => {
		dispatch(toggleLoading());
		let rawResp = await fetch("http://localhost:8010/api/entities");
		let response = await rawResp.json();
		if (rawResp.status === 200) {
			let apiEntities = response.data;
			//just to make sure wo dont miss entities on start up
			if (apiEntities[0] === "") {
				apiEntities = [{ value: "users" }, { value: "repositories" }];
			}
			dispatch(setEntities(apiEntities[0], apiEntities));
		} else {
			dispatch(setError(response.message || ""));
		}
	}, setError);
};
