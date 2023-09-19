import { takeEvery, put } from "redux-saga/effects";
import { DELETE_SHOP_CATEGORY } from "./Constant";
import { deleteShopCategoryAPI } from "../../services/DeleteShopCategory.api";
import {
  deleteShopCategory,
  deleteShopCategorySuccess,
  deleteShopCategoryFailure,
  internalServerFailure,
} from "../redux/DeleteShopCategory.redux";
import {
  SuccessResponseState,
  deleteShopCategoryByIdPayload,
} from "../../Modal/DeleteShopCategory.modal";
import { removeShopCategoryById } from "../redux/GetShopCategories.redux";

export function* deleteShopCategoryAPISaga({
  payload,
}: {
  type: string;
  payload: deleteShopCategoryByIdPayload;
}) {
  yield put(deleteShopCategory());
  let result: SuccessResponseState;
  try {
    yield put(removeShopCategoryById(payload));
    result = yield deleteShopCategoryAPI(payload);
    if (result.status === 200) {
      yield put(deleteShopCategorySuccess(result));
    } else {
      yield put(deleteShopCategoryFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* deleteShopCategorySaga() {
  yield takeEvery(DELETE_SHOP_CATEGORY, deleteShopCategoryAPISaga);
}
