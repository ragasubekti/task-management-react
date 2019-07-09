import axios from "axios";
import decode from "jwt-decode";
import { APP_HOST } from "../../constant";

export const LOGIN = "@user/LOGIN";
export const LOGIN_SUCCESS = "@user/LOGIN_SUCCESS";
export const LOGIN_FAIL = "@user/LOGIN_FAIL";

export const REGISTER = "@user/REGISTER";
export const REGISTER_SUCCESS = "@user/REGISTER_SUCCESS";
export const REGISTER_FAIL = "@user/REGISTER_FAIL";

export const LOGOUT = "@user/LOGOUT";

export const logout = () => dispatch =>
  new Promise(resolve => {
    dispatch({
      type: LOGOUT
    });

    localStorage.clear();

    resolve();
  });

export const recheckToken = () => dispatch =>
  new Promise(resolve => {
    const token = localStorage.getItem("USER_AUTH_TOKEN");
    if (token) {
      const decoded = decode(token);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: token,
          isManager: decoded.isManager,
          name: decoded.name
        }
      });
    }
    resolve();
  });

export const userLogin = ({ username, password }) => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch({
      type: LOGIN
    });

    try {
      const response = await axios.post(`${APP_HOST}/login`, {
        username,
        password
      });

      const result = response.data;

      if (result && result.token) {
        localStorage.setItem("USER_AUTH_TOKEN", result.token);

        const decoded = decode(result.token);

        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            token: result.token,
            isManager: decoded.isManager,
            name: decoded.name
          }
        });

        resolve();
      } else {
        dispatch({
          type: LOGIN_FAIL,
          payload: {
            message: result ? result.message : "Unknown Error"
          }
        });

        reject();
      }
    } catch (e) {
      dispatch({
        type: LOGIN_FAIL,
        payload: {
          message: e.response && e.response.data.message
        }
      });

      reject();
    }
  });

export const userRegistration = ({ name, username, password }) => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch({
      type: REGISTER
    });

    try {
      await axios.post(`${APP_HOST}/register`, {
        name,
        username,
        password
      });

      dispatch({
        type: REGISTER_SUCCESS
      });

      resolve();
    } catch (e) {
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          message: e.response && e.response.data.message
        }
      });

      reject();
    }
  });
