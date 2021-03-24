import React from "react";
import { connect } from "react-redux";
import Counter from "./components/Counter";
import Todos from "./components/Todos";

const App = () => {
  return (
    <div>
      <Counter />
      <hr />
      <Todos />
    </div>
  );
};

export default App;
