import axios from "axios";
import decode from "jwt-decode";
import { APP_HOST } from "../constant";

export const LOGIN = "@user/LOGIN";
export const LOGIN_SUCCESS = "@user/LOGIN_SUCCESS";
export const LOGIN_FAIL = "@user/LOGIN_FAIL";

const initialState = {
  isAuthorized: false,
  isManager: false,
  token: "",
  hasError: false,
  errorMessage: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isLoading: false,
        isAuthorized: true,
        isManager: action.payload.isManager
      };
    case LOGIN_FAIL:
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

export const recheckToken = () => dispatch =>
  new Promise(resolve => {
    const token = localStorage.getItem("USER_AUTH_TOKEN");
    if (token) {
      const decoded = decode(token);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: token,
          isManager: decoded.isManager
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
            isManager: decoded.isManager
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
