import React from "react";

const Todo = ({ todo, toggle, remove }) => {
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
          "text-decoration": todo.done ? "line-through" : "none",
        }}
      >
        {todo.text}
      </span>
      <button
        onClick={() => {
          remove(todo.id);
        }}
      >
        삭제
      </button>
    </li>
  );
};

const Todos = ({ todos, input, changeInput, insert, toggle, remove }) => {
  const onChange = (e) => {
    changeInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    insert(input);
    changeInput("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={input} onChange={onChange} />
        <button type="submit">추가</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} toggle={toggle} remove={remove} />
        ))}
      </ul>
    </div>
  );
};

export default Todos;
