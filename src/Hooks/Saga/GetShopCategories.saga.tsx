import { takeEvery, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { GET_SHOP_CATEGORIES } from "./Constant";
import { getShopCategoriesAPI } from "../../services/GetShopCategories.api";
import {
  getShopCategories,
  getShopCategoriesSuccess,
  getShopCategoriesFailure,
  internalServerFailure,
} from "../redux/GetShopCategories.redux";

export function* getShopCategoriesAPISaga() {
  yield put(getShopCategories());
  let result: AxiosResponse;
  try {
    result = yield getShopCategoriesAPI();
    if (result.data.status === 200) {
      yield put(getShopCategoriesSuccess(result));
    } else {
      yield put(getShopCategoriesFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getShopCategoriesSaga() {
  yield takeEvery(GET_SHOP_CATEGORIES, getShopCategoriesAPISaga);
}
