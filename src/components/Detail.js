import React from "react";
import { connect } from "react-redux";

const Detail = ({ match, todos }) => {
  const {
    params: { id },
  } = match;

  const todo = todos.find((t) => id == t.id);

  console.log(todo);

  return (
    <div>
      <h1>Detail</h1>
      <span>{todo.text}</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { todos: state };
};

export default connect(mapStateToProps)(Detail);
