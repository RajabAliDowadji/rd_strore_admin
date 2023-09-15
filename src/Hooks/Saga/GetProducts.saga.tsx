import { takeEvery, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { GET_PRODUCTS } from "./Constant";
import { getProductsAPI } from "../../services/GetProducts.api";
import {
  getProducts,
  getProductsSuccess,
  getProductsFailure,
  internalServerFailure,
} from "../redux/GetProducts.redux";

export function* getProductsAPISaga() {
  yield put(getProducts());
  let result: AxiosResponse;
  try {
    result = yield getProductsAPI();
    if (result.data.status === 200) {
      yield put(getProductsSuccess(result));
    } else {
      yield put(getProductsFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getProductsSaga() {
  yield takeEvery(GET_PRODUCTS, getProductsAPISaga);
}
