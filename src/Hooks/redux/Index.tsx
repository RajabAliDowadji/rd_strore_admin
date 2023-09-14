import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./UserLogin.redux";

const rootReducers = combineReducers({
  user: userReducer,
});
export default rootReducers;
