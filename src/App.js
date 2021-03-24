import React from "react";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import todoStore from "./store";

const App = () => {
  return (
    <Provider store={todoStore}>
      <Route path="/" exact component={Home} />
    </Provider>
  );
};

export default App;
