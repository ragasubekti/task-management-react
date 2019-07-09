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
  COMPLETE_TASK_FAIL
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
    default:
      return state;
  }
};
