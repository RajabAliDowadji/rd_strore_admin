import { takeEvery, put } from "redux-saga/effects";
import { GET_ADMIN_COMMISSIONS } from "./Constant";
import { getAdminCommissionAPI } from "../../services/GetAdminCommission.api";
import {
  getAdminCommission,
  getAdminCommissionSuccess,
  getAdminCommissionFailure,
  internalServerFailure,
} from "../redux/GetAdminCommission.redux";
import { SuccessResponseState } from "../../Modal/GetAdminCommission.modal";

export function* getAdminCommissionAPISaga() {
  yield put(getAdminCommission());
  let result: SuccessResponseState;
  try {
    result = yield getAdminCommissionAPI();
    if (result.status === 200) {
      yield put(getAdminCommissionSuccess(result));
    } else {
      yield put(getAdminCommissionFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getAdminCommissionSaga() {
  yield takeEvery(GET_ADMIN_COMMISSIONS, getAdminCommissionAPISaga);
}
