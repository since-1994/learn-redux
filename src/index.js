import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import rootReducer from "./modules/rootReducer";
import { createStore } from "redux";

const store = createStore(rootReducer);

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById("root")
);
