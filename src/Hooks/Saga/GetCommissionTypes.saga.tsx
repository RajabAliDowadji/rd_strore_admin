import { takeEvery, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { GET_COMMISSION_TYPES } from "./Constant";
import { getCommissionTypesAPI } from "../../services/GetCommissionTypes.api";
import {
  getCommissionTypes,
  getCommissionTypesSuccess,
  getCommissionTypesFailure,
  internalServerFailure,
} from "../redux/GetCommissionTypes.redux";

export function* getCommissionTypesAPISaga() {
  yield put(getCommissionTypes());
  let result: AxiosResponse;
  try {
    result = yield getCommissionTypesAPI();
    if (result.data.status === 200) {
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
