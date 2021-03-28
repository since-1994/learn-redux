import { createAction, handleActions } from "redux-actions";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

const counter = handleActions(
  {
    [INCREASE]: (state) => ({ ...state, number: state.number + 1 }),
    [DECREASE]: (state) => ({ ...state, number: state.number - 1 }),
  },
  {
    number: 0,
  }
);

export default counter;
