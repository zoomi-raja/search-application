import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import gitReducer from "./git/reducer";
const storeEnhancer =
	process.env.NODE_ENV === "development"
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			: compose
		: compose;

export default function configureStore() {
	const store = createStore(
		combineReducers({ git: gitReducer }),
		storeEnhancer(applyMiddleware(thunk))
	);
	return store;
}
