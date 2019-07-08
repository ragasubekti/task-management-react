import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import user from "./modules/user";

const reducers = combineReducers({
  user
});

export default createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    process.env.NODE_ENV !== "production" &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
