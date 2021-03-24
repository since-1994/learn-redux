const INCRESE = "counter/increase";
const DECREASE = "counter/decrease";

export const increase = () => {
  return {
    type: INCRESE,
  };
};

export const decrease = () => {
  return {
    type: DECREASE,
  };
};

const counter = (
  state = {
    number: 0,
  },
  action
) => {
  switch (action.type) {
    case INCRESE:
      return {
        number: state.number + 1,
      };
    case DECREASE:
      return {
        number: state.number - 1,
      };
    default:
      return state;
  }
};

export default counter;
