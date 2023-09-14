import { takeEvery, put } from "redux-saga/effects";
import { USER_LOGIN } from "./Constant";
import { userLoginAPI } from "../../services/UserLogin.api";
import {
  getUserLogin,
  userLoginFailure,
  userLoginInternalFailure,
  userLoginSuccess,
} from "../redux/UserLogin.redux";
import { AxiosResponse } from "axios";
import { userLoginPayload } from "../../Modal/UserLogin.modal";

export function* userLoginAPISaga({
  payload,
}: {
  type: string;
  payload: userLoginPayload;
}) {
  yield put(getUserLogin());
  let result: AxiosResponse;
  try {
    result = yield userLoginAPI(payload);
    if (result.data.status === 200) {
      yield put(userLoginSuccess(result));
    } else {
      yield put(userLoginFailure(result));
    }
  } catch (e) {
    yield put(userLoginInternalFailure());
  }
}

export default function* userLoginSaga() {
  yield takeEvery(USER_LOGIN, userLoginAPISaga);
}
