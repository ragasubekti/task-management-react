import axios from "axios";
import { APP_HOST } from "../../constant";
import { moment } from "moment";

export const GET_TASK = "@task/GET_TASK";
export const GET_TASK_SUCCESS = "@task/GET_TASK_SUCCESS";
export const GET_TASK_FAIL = "@task/GET_TASK_FAIL";

export const SUBMIT_TASK = "@task/SUBMIT_TASK";
export const SUBMIT_TASK_SUCCESS = "@task/SUBMIT_TASK_SUCCESS";
export const SUBMIT_TASK_FAIL = "@task/SUBMIT_TASK_FAIL";

export const COMPLETE_TASK = "@task/COMPLETE_TASK";
export const COMPLETE_TASK_SUCCESS = "@task/COMPLETE_TASK_SUCCESS";
export const COMPLETE_TASK_FAIL = "@task/COMPLETE_TASK_FAIL";

export const DELETE_TASK = "@task/DELETE_TASK";
export const DELETE_TASK_SUCCESS = "@task/DELETE_TASK_SUCCESS";
export const DELETE_TASK_FAIL = "@task/DELETE_TASK_FAIL";

export const UPDATE_TASK = "@task/UPDATE_TASK";
export const UPDATE_TASK_SUCCESS = "@task/UPDATE_TASK_SUCCESS";
export const UPDATE_TASK_FAIL = "@task/UPDATE_TASK_FAIL";

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

export const completeTask = id => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch({
      type: COMPLETE_TASK
    });

    try {
      await axios.put(
        `${APP_HOST}/task/${id}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("USER_AUTH_TOKEN")}`
          }
        }
      );

      dispatch({
        type: COMPLETE_TASK_SUCCESS
      });
      resolve();
    } catch (e) {
      reject();
    }
  });

export const deleteTask = id => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch({
      type: DELETE_TASK
    });

    try {
      await axios.delete(`${APP_HOST}/task/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("USER_AUTH_TOKEN")}`
        }
      });

      dispatch({
        type: DELETE_TASK_SUCCESS
      });
      resolve();
    } catch (e) {
      dispatch({
        type: DELETE_TASK_FAIL,
        payload: {
          message: e.response.data.message || "Unknown Error"
        }
      });
      reject();
    }
  });

export const updateTask = (id, data) => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch({
      type: UPDATE_TASK
    });

    try {
      await axios.put(
        `${APP_HOST}/task/${id}`,
        {
          ...data,
          dueDate: data.dueDate.toISOString() || moment().toISOString()
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("USER_AUTH_TOKEN")}`
          }
        }
      );

      dispatch({
        type: UPDATE_TASK_SUCCESS
      });
      resolve();
    } catch (e) {
      dispatch({
        type: UPDATE_TASK_FAIL,
        payload: {
          message: e.response.data.message || "Unknown Error"
        }
      });
      reject();
    }
  });
