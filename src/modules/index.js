import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";

const root = combineReducers({
  counter,
  todos,
});

export default root;
