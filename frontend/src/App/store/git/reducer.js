import * as actionTypes from "./actionTypes";

const initialState = {
	data: [],
	entity: "",
	loading: false,
	errMessage: "",
};
const gitReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOADING:
			return {
				...state,
				loading: !state.loading,
			};
		case actionTypes.SET_ERROR:
			return {
				...state,
				errMessage: action.errMessage,
				loading: false,
			};
		case actionTypes.CLEAR_ERROR:
			return {
				...state,
				errMessage: "",
				loading: false,
			};
		case actionTypes.DATA_FETCHED:
			return {
				...state,
				data: action.data.result,
				entity: action.data.entity,
				loading: false,
			};
		default:
			return state;
	}
};
export default gitReducer;
