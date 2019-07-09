import axios from "axios";
import { APP_HOST } from "../../constant";

export const GET_TASK = "@task/GET_TASK";
export const GET_TASK_SUCCESS = "@task/GET_TASK_SUCCESS";
export const GET_TASK_FAIL = "@task/GET_TASK_FAIL";

export const SUBMIT_TASK = "@task/SUBMIT_TASK";
export const SUBMIT_TASK_SUCCESS = "@task/SUBMIT_TASK_SUCCESS";
export const SUBMIT_TASK_FAIL = "@task/SUBMIT_TASK_FAIL";

export const submitTask = task => dispatch =>
  new Promise(async resolve => {
    dispatch({
      type: SUBMIT_TASK
    });

    try {
      const response = await axios.post(
        `${APP_HOST}/task`,
        {
          ...task,
          dueDate: task.dueDate.toISOString()
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("USER_AUTH_TOKEN")}`
          }
        }
      );

      dispatch({
        type: SUBMIT_TASK_SUCCESS
      });

      resolve();
    } catch (e) {
      dispatch({
        type: SUBMIT_TASK_FAIL,
        payload: {
          message: e.response.data.message || "Unknown Error"
        }
      });

      resolve();
    }
  });

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
