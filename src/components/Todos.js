import React from "react";
import { connect } from "react-redux";
import { changeInput, insert, remove, toggle } from "../modules/todos";

const Todo = ({ todo, remove, toggle }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => {
          toggle(todo.id);
        }}
      />
      <span
        style={{
          textDecoration: todo.done ? "line-through" : "none",
        }}
      >
        {todo.text}
      </span>
      <button
        onClick={() => {
          remove(todo.id);
        }}
      >
        X
      </button>
    </li>
  );
};

const Todos = ({ input, todos, changeInput, insert, remove, toggle }) => {
  const onChange = (e) => {
    changeInput(e.target.value);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input !== "") {
            insert(input);
          }
          changeInput("");
        }}
      >
        <input type="text" value={input} onChange={onChange} />
        <button>추가</button>
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <Todo key={todo.id} todo={todo} remove={remove} toggle={toggle} />
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    input: state.todos.input,
    todos: state.todos.todos,
  };
};

const mapDispatchToProps = {
  changeInput,
  insert,
  remove,
  toggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
