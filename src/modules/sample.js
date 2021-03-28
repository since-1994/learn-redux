import { createAction, handleActions } from "redux-actions";
import { startLoading, finishLoading } from "./loading";
import * as api from "../lib/api.js";

const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

export const getPost = (id) => async (dispatch) => {
  dispatch(startLoading("sample/GET_POST"));
  try {
    const response = await api.getPost(id);
    dispatch({
      type: GET_POST_SUCCESS,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: e,
    });
    throw e;
  }
  dispatch(finishLoading("sample/GET_POST"));
};

export const getUsers = (id) => async (dispatch) => {
  dispatch(startLoading("sample/GET_USERS"));
  try {
    const response = await api.getUsers(id);
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: GET_USERS_FAILURE,
      payload: e,
    });
  }
  dispatch(finishLoading("sample/GET_USERS"));
};

const initialState = {
  post: null,
  users: null,
};

const sample = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload,
    }),
    [GET_POST_FAILURE]: (state, action) => state,
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
    [GET_USERS_FAILURE]: (state, action) => ({
      ...state,
    }),
  },
  initialState
);

export default sample;
