import * as actionTypes from "./actionTypes";
import { reduxCatchAsync } from "../../utility/utility";

export const toggleLoading = () => ({
	type: actionTypes.LOADING,
});

export const dataFetched = (data) => ({
	type: actionTypes.DATA_FETCHED,
	data,
});

export const setError = (msg) => ({
	type: actionTypes.SET_ERROR,
	errMessage: msg,
});

export const clearError = () => ({
	type: actionTypes.CLEAR_ERROR,
});

export const clearData = () => ({
	type: actionTypes.DATA_CLEAR,
});

export const fetchGitData = (entity, text) =>
	reduxCatchAsync(async (dispatch) => {
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
			console.log(response);
			dispatch(dataFetched(response.data));
		} else {
			dispatch(setError(response.message));
		}
	}, setError);

export const setText = (text) => ({
	type: actionTypes.SET_TEXT,
	text,
});
