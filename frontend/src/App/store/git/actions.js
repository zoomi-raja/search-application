import * as actionTypes from "./actionTypes";
import { reduxCatchAsync } from "../../utility/utility";
export const toggleLoading = () => {
	return {
		type: actionTypes.LOADING,
	};
};

export const dataFetched = (data) => {
	return {
		type: actionTypes.DATA_FETCHED,
		data,
	};
};

export const setError = (msg) => {
	return {
		type: actionTypes.SET_ERROR,
		errMessage: msg,
	};
};

export const clearError = () => {
	return {
		type: actionTypes.CLEAR_ERROR,
	};
};

export const fetchGitData = (entity, text) => {
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
			console.log(response);
			dispatch(dataFetched(response.data));
		} else {
			dispatch(setError(response.message));
		}
	}, setError);
};
