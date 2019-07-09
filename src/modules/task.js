import axios from "axios";
import { APP_HOST } from "../constant";

export const GET_TASK = "@task/GET_TASK";
export const GET_TASK_SUCCESS = "@task/GET_TASK_SUCCESS";
export const GET_TASK_FAIL = "@task/GET_TASK_FAIL";

const initialState = {
  isLoading: false,
  data: [],
  hasError: false,
  errorMessage: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK:
      return {
        ...state,
        isLoading: true,
        hasError: false
      };
    case GET_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data
      };
    case GET_TASK_FAIL:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errorMessage: action.payload.message
      };
    default:
      return state;
  }
};

export const getTaskList = () => async dispatch => {
  dispatch({
    type: GET_TASK
  });

  try {
    const response = await axios.get(`${APP_HOST}/task`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("USER_AUTH_TOKEN")}`
      }
    });

    const result = response.data;

    dispatch({
      type: GET_TASK_SUCCESS,
      payload: { data: result.data }
    });
  } catch (e) {}
};
