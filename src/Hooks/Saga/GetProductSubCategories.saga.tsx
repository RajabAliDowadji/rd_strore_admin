import { takeEvery, put } from "redux-saga/effects";
import { GET_PRODUCT_SUB_CATEGORIES } from "./Constant";
import { getProductSubCategoriesAPI } from "../../services/GetProductSubCategories.api";
import {
  getProductSubCategories,
  getProductSubCategoriesSuccess,
  getProductSubCategoriesFailure,
  internalServerFailure,
} from "../redux/GetProductSubCategories.redux";
import { SuccessResponseState } from "../../Modal/GetProductSubCategories.modal";

export function* getProductSubCategoriesAPISaga() {
  yield put(getProductSubCategories());
  let result: SuccessResponseState;
  try {
    result = yield getProductSubCategoriesAPI();
    if (result.status === 200) {
      yield put(getProductSubCategoriesSuccess(result));
    } else {
      yield put(getProductSubCategoriesFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getProductSubCategoriesSaga() {
  yield takeEvery(GET_PRODUCT_SUB_CATEGORIES, getProductSubCategoriesAPISaga);
}
