import * as actionTypes from "./actionTypes";

const initialState = {
	data: [],
	indexer: {},
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

		case actionTypes.SET_DATA:
			return {
				...state,
				data: action.data,
				entity: action.entity,
			};

		case actionTypes.CLEAR_DATA:
			return {
				...state,
				data: [],
			};
		/*main function responsible for updating indexer againts entity and text searched*/
		case actionTypes.FETCHED_DATA:
			return {
				...state,
				data: action.data.result,
				entity: action.data.entity,
				indexer: {
					...state.indexer,
					[action.data.entity]: {
						...state.indexer[action.data.entity],
						[action.text]: action.data.result,
					},
				},
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
