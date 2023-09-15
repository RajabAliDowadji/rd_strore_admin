import { takeEvery, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { GET_PRODUCT_BRANDS } from "./Constant";
import { getProductBrandsAPI } from "../../services/GetProductBrands.api";
import {
  getProductBrands,
  getProductBrandsSuccess,
  getProductBrandsFailure,
  internalServerFailure,
} from "../redux/GetProductBrands.redux";

export function* getProductBrandsAPISaga() {
  yield put(getProductBrands());
  let result: AxiosResponse;
  try {
    result = yield getProductBrandsAPI();
    if (result.data.status === 200) {
      yield put(getProductBrandsSuccess(result));
    } else {
      yield put(getProductBrandsFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getProductBrandsSaga() {
  yield takeEvery(GET_PRODUCT_BRANDS, getProductBrandsAPISaga);
}
