import axios from "axios";
import { APP_HOST } from "../../constant";

import {
  GET_TASK,
  GET_TASK_SUCCESS,
  GET_TASK_FAIL,
  SUBMIT_TASK,
  SUBMIT_TASK_SUCCESS,
  SUBMIT_TASK_FAIL,
  COMPLETE_TASK,
  COMPLETE_TASK_SUCCESS,
  COMPLETE_TASK_FAIL,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  UPDATE_TASK,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL
} from "./actions";

const initialState = {
  list: {
    isLoading: false,
    data: [],
    hasError: false,
    errorMessage: ""
  },
  submit: {
    isLoading: false,
    hasError: false,
    errorMessage: ""
  },
  complete: {
    isLoading: false,
    hasError: false,
    errorMessage: ""
  },
  deletion: {
    isLoading: false,
    hasError: false,
    errorMessage: ""
  },
  update: {
    isLoading: false,
    hasError: false,
    errorMessage: ""
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK:
      return {
        ...state,
        list: {
          ...state.list,
          isLoading: true,
          hasError: false
        }
      };
    case GET_TASK_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          isLoading: false,
          data: action.payload.data
        }
      };
    case GET_TASK_FAIL:
      return {
        ...state,
        list: {
          ...state,
          isLoading: false,
          hasError: true,
          errorMessage: action.payload.message
        }
      };
    case SUBMIT_TASK:
      return {
        ...state,
        submit: {
          ...state.submit,
          isLoading: true,
          hasError: false
        }
      };
    case SUBMIT_TASK_SUCCESS:
      return {
        ...state,
        submit: {
          ...state.submit,
          isLoading: false
        }
      };
    case COMPLETE_TASK:
      return {
        ...state,
        complete: {
          ...state.complete,
          isLoading: true,
          hasError: false
        }
      };
    case COMPLETE_TASK_SUCCESS:
      return {
        ...state,
        complete: {
          ...state.complete,
          isLoading: false
        }
      };
    case COMPLETE_TASK_FAIL:
      return {
        ...state,
        complete: {
          ...state.complete,
          isLoading: false
        }
      };
    case DELETE_TASK:
      return {
        ...state,
        deletion: {
          ...state.deletion,
          isLoading: true,
          hasError: false
        }
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        deletion: {
          ...state.deletion,
          isLoading: false
        }
      };
    case DELETE_TASK_FAIL:
      return {
        ...state,
        deletion: {
          ...state.deletion,
          isLoading: false
        }
      };
    case UPDATE_TASK:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: true,
          hasError: false
        }
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false
        }
      };
    case UPDATE_TASK_FAIL:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false
        }
      };
    default:
      return state;
  }
};
