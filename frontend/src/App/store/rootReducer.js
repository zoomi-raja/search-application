import gitReducer from "./git/reducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

//persist storage configuration using sessionstorage
const persistConfig = {
	key: "root",
	storage: storage,
};
const rootReducer = combineReducers({ git: gitReducer });
export default function reducer() {
	return persistReducer(persistConfig, rootReducer);
}
