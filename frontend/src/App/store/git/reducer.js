import * as actionTypes from "./actionTypes";

const initialState = {
	loading: false,
	data: [],
};
const auth = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOADING:
			return {
				...state,
				loading: !state.loading,
			};
		case actionTypes.DATA:
			return {
				...state,
				data: action.data,
			};
		default:
			return state;
	}
};
export default auth;
