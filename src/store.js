import { createStore } from "redux";

const ADD = "ADD";
const DEL = "DEL";

const addTodo = (state, text) => {
  return state.concat({
    text,
    id: Date.now(),
  });
};

const deleteTodo = (state, id) => {
  console.log(id);
  return state.filter((todo) => todo.id != id);
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return action.todos;
    case DEL:
      return action.todos;
    default:
      return state;
  }
};

const todoStore = createStore(reducer);

export { addTodo, deleteTodo };
export default todoStore;
