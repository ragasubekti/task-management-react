import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import user from "./modules/user";
import task from "./modules/task";

const reducers = combineReducers({
  user,
  task
});

export default createStore(reducers, compose(applyMiddleware(thunk)));
