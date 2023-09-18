import { takeEvery, put } from "redux-saga/effects";
import { GET_PRODUCT_TYPES } from "./Constant";
import { getProductTypesAPI } from "../../services/GetProductTypes.api";
import {
  getProductTypes,
  getProductTypesSuccess,
  getProductTypesFailure,
  internalServerFailure,
} from "../redux/GetProductTypes.redux";
import { SuccessResponseState } from "../../Modal/GetProductTypes.modal";

export function* getProductTypesAPISaga() {
  yield put(getProductTypes());
  let result: SuccessResponseState;
  try {
    result = yield getProductTypesAPI();
    if (result.status === 200) {
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
