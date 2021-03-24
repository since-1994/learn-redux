import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { addTodo, deleteTodo } from "../store";

const Home = ({ todos, dispatch }) => {
  const inputRef = useRef();
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD", todos: addTodo(todos, text) });
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} type="text" onChange={onChange} />
        <button>추가</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} id={todo.id}>
            <span>{todo.text}</span>
            <button
              onClick={(e) =>
                dispatch({
                  type: "DEL",
                  todos: deleteTodo(todos, e.target.parentNode.id),
                })
              }
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = (state) => {
  return { todos: state };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
