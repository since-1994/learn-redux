import React from "react";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import Detail from "./components/Detail";
import Home from "./components/Home";

const App = () => {
  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/:id" component={Detail} />
    </>
  );
};

export default App;
