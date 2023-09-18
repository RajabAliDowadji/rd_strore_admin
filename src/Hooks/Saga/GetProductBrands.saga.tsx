import { takeEvery, put } from "redux-saga/effects";
import { GET_PRODUCT_BRANDS } from "./Constant";
import { getProductBrandsAPI } from "../../services/GetProductBrands.api";
import {
  getProductBrands,
  getProductBrandsSuccess,
  getProductBrandsFailure,
  internalServerFailure,
} from "../redux/GetProductBrands.redux";
import { SuccessResponseState } from "../../Modal/GetProductBrands.modal";

export function* getProductBrandsAPISaga() {
  yield put(getProductBrands());
  let result: SuccessResponseState;
  try {
    result = yield getProductBrandsAPI();
    if (result.status === 200) {
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
