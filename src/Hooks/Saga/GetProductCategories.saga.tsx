import { takeEvery, put } from "redux-saga/effects";
import { GET_PRODUCT_CATEGORIES } from "./Constant";
import { getProductCategoriesAPI } from "../../services/GetProductCategories.api";
import {
  getProductCategories,
  getProductCategoriesSuccess,
  getProductCategoriesFailure,
  internalServerFailure,
} from "../redux/GetProductCategories.redux";
import { SuccessResponseState } from "../../Modal/GetProductCategories.modal";

export function* getProductCategoriesAPISaga() {
  yield put(getProductCategories());
  let result: SuccessResponseState;
  try {
    result = yield getProductCategoriesAPI();
    if (result.status === 200) {
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
