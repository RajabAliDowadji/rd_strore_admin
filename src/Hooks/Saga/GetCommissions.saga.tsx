import { takeEvery, put } from "redux-saga/effects";
import { GET_COMMISSIONS } from "./Constant";
import { getCommissionsAPI } from "../../services/GetCommissions.api";
import {
  getCommissions,
  getCommissionsSuccess,
  getCommissionsFailure,
  internalServerFailure,
} from "../redux/GetCommissions.redux";
import { SuccessResponseState } from "../../Modal/GetCommissions.modal";

export function* getCommissionsAPISaga() {
  yield put(getCommissions());
  let result: SuccessResponseState;
  try {
    result = yield getCommissionsAPI();
    if (result.status === 200) {
      yield put(getCommissionsSuccess(result));
    } else {
      yield put(getCommissionsFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getCommissionsSaga() {
  yield takeEvery(GET_COMMISSIONS, getCommissionsAPISaga);
}
