const CHANGEINPUT = "todos/change-input";
const INSERT = "todos/insert";
const REMOVE = "todos/remove";
const TOGGLE = "todos/toggle";

export const changeInput = (input) => {
  return {
    type: CHANGEINPUT,
    input,
  };
};

export const insert = (text) => {
  return {
    type: INSERT,
    todo: {
      text,
      id: Date.now(),
      done: false,
    },
  };
};

export const remove = (id) => {
  return {
    type: REMOVE,
    id,
  };
};

export const toggle = (id) => {
  return {
    type: TOGGLE,
    id,
  };
};

const initialTodos = [
  {
    id: 1,
    text: "새로운 세계",
    done: false,
  },
  {
    id: 2,
    text: "Hello world",
    done: false,
  },
];

const todos = (
  state = {
    input: "",
    todos: initialTodos,
  },
  action
) => {
  switch (action.type) {
    case CHANGEINPUT:
      return {
        ...state,
        input: action.input,
      };
    case INSERT:
      return {
        ...state,
        todos: state.todos.concat(action.todo),
      };
    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case TOGGLE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        ),
      };
    default:
      return state;
  }
};

export default todos;
