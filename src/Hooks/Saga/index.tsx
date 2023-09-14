import { all, fork } from "redux-saga/effects";
import userLoginSaga from "./UserLogin.saga";

export default function* rootSaga() {
  yield all([fork(userLoginSaga)]);
}
