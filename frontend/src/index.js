import "./index.scss";
import React from "react";
import App from "./App/App";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./App/store/store";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { PersistGate } from "redux-persist/integration/react";
const { store, persistor } = configureStore();

/** redux store is configured here */
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
