import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changeInput, insert, remove, toggle } from "../modules/todos";
import Todos from "./Todos";

const Home = (props) => {
  return <Todos {...props} />;
};

const mapStateToProps = ({ todos }) => {
  return {
    input: todos.input,
    todos: todos.todos,
  };
};

const mapDispatchToProps = {
  changeInput,
  insert,
  remove,
  toggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
