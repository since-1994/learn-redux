import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";

const App = () => {
  return (
    <div>
      <Route path="/" exact component={Home} />
    </div>
  );
};

export default App;
