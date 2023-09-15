import { takeEvery, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { GET_PRODUCT_TYPES } from "./Constant";
import { getProductTypesAPI } from "../../services/GetProductTypes.api";
import {
  getProductTypes,
  getProductTypesSuccess,
  getProductTypesFailure,
  internalServerFailure,
} from "../redux/GetProductTypes.redux";

export function* getProductTypesAPISaga() {
  yield put(getProductTypes());
  let result: AxiosResponse;
  try {
    result = yield getProductTypesAPI();
    if (result.data.status === 200) {
      yield put(getProductTypesSuccess(result));
    } else {
      yield put(getProductTypesFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getProductTypesSaga() {
  yield takeEvery(GET_PRODUCT_TYPES, getProductTypesAPISaga);
}
