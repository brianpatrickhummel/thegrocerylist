// client root-level index.js

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

// Create Redux Store, pass in reducers, empty state object and the applyMiddleware method
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Wrap our root level component in the Provider tag to connect Redux with React
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
