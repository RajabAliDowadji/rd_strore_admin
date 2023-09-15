import { takeEvery, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { GET_PRODUCT_CATEGORIES } from "./Constant";
import { getProductCategoriesAPI } from "../../services/GetProductCategories.api";
import {
  getProductCategories,
  getProductCategoriesSuccess,
  getProductCategoriesFailure,
  internalServerFailure,
} from "../redux/GetProductCategories.redux";

export function* getProductCategoriesAPISaga() {
  yield put(getProductCategories());
  let result: AxiosResponse;
  try {
    result = yield getProductCategoriesAPI();
    if (result.data.status === 200) {
      yield put(getProductCategoriesSuccess(result));
    } else {
      yield put(getProductCategoriesFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getProductCategoriesSaga() {
  yield takeEvery(GET_PRODUCT_CATEGORIES, getProductCategoriesAPISaga);
}
