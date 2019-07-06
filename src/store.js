import {combineReducers, createStore} from "redux";

import user from './modules/user'

const reducers = combineReducers({
  user
})

export default createStore(
  reducers
)