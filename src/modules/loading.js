import { createAction, handleActions } from "redux-actions";

const START_LOADING = "loading/START_LOADING";
const FINISH_LOADING = "loading/FINISH_LOADING";

export const startLoading = (type) => ({
  type: START_LOADING,
  payload: type,
});
export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType) => requestType
);

const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  {}
);

export default loading;
