import axios from "axios";
import decode from "jwt-decode";
import { APP_HOST } from "../constant";

export const LOGIN = "@user/LOGIN";
export const LOGIN_SUCCESS = "@user/LOGIN_SUCCESS";
export const LOGIN_FAIL = "@user/LOGIN_FAIL";

export const LOGOUT = "@user/LOGOUT";

const initialState = {
  isAuthorized: false,
  isManager: false,
  token: "",
  name: "",
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
        isManager: action.payload.isManager,
        name: action.payload.name
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errorMessage: action.payload.message
      };
    case LOGOUT:
      return {
        ...state,
        isAuthorized: false,
        isManager: false,
        token: "",
        name: "",
        hasError: false,
        errorMessage: ""
      };
    default:
      return state;
  }
};

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
