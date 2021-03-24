import React from "react";
import ReactDOM from "react-dom";
import todoStore from "./store";
import App from "./App";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);
