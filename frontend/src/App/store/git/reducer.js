import * as actionTypes from "./actionTypes";

const initialState = {
	data: [],
	userIndex: {},
	repoIndex: {},
	text: "",
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
		case actionTypes.DATA_CLEAR:
			return {
				...state,
				data: [],
			};
		case actionTypes.DATA_FETCHED:
			return {
				...state,
				data: action.data.result,
				entity: action.data.entity,
				loading: false,
			};
		case actionTypes.SET_TEXT:
			return {
				...state,
				text: action.text,
			};
		default:
			return state;
	}
};
export default gitReducer;
