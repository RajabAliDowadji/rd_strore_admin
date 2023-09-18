import { takeEvery, put } from "redux-saga/effects";
import { GET_COMMISSION_TYPES } from "./Constant";
import { getCommissionTypesAPI } from "../../services/GetCommissionTypes.api";
import {
  getCommissionTypes,
  getCommissionTypesSuccess,
  getCommissionTypesFailure,
  internalServerFailure,
} from "../redux/GetCommissionTypes.redux";
import { SuccessResponseState } from "../../Modal/GetCommissionTypes.modal";

export function* getCommissionTypesAPISaga() {
  yield put(getCommissionTypes());
  let result: SuccessResponseState;
  try {
    result = yield getCommissionTypesAPI();
    if (result.status === 200) {
      yield put(getCommissionTypesSuccess(result));
    } else {
      yield put(getCommissionTypesFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getCommissionTypesSaga() {
  yield takeEvery(GET_COMMISSION_TYPES, getCommissionTypesAPISaga);
}
