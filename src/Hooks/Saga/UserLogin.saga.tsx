import { takeEvery, put } from "redux-saga/effects";
import { USER_LOGIN } from "./Constant";
import { userLoginAPI } from "../../services/UserLogin.api";
import {
  getUserLogin,
  userLoginFailure,
  internalServerFailure,
  userLoginSuccess,
} from "../redux/UserLogin.redux";
import {
  SuccessResponseState,
  UserLoginPayload,
} from "../../Modal/UserLogin.modal";

export function* userLoginAPISaga({
  payload,
}: {
  type: string;
  payload: UserLoginPayload;
}) {
  yield put(getUserLogin());
  let result: SuccessResponseState;
  try {
    result = yield userLoginAPI(payload);
    if (result.status === 200) {
      yield put(userLoginSuccess(result));
    } else {
      yield put(userLoginFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* userLoginSaga() {
  yield takeEvery(USER_LOGIN, userLoginAPISaga);
}
