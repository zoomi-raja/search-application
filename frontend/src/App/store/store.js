import thunk from "redux-thunk";
import reducer from "./rootReducer";
import { persistStore } from "redux-persist";
import { createStore, applyMiddleware, compose } from "redux";
//to set the devtool compose for dev env
const storeEnhancer =
	process.env.NODE_ENV === "development" &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: compose;

export default function configureStore() {
	const store = createStore(reducer(), storeEnhancer(applyMiddleware(thunk)));
	const persistor = persistStore(store);
	return { store, persistor };
}
