import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./actions";

const initialState = {
  isAuthorized: false,
  isManager: false,
  token: "",
  name: "",
  hasError: false,
  errorMessage: "",
  register: {
    isLoading: false,
    hasError: false,
    errorMessage: ""
  }
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
    case REGISTER:
      return {
        ...state,
        register: {
          ...state.register,
          isLoading: true,
          hasError: false
        }
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        register: {
          ...state.register,
          isLoading: false
        }
      };
    case REGISTER_FAIL:
      return {
        ...state,
        register: {
          ...state.register,
          isLoading: false,
          hasError: true,
          errorMessage: action.payload.message
        }
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
