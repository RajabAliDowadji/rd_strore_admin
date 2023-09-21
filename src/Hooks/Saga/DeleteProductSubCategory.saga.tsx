import { takeEvery, put } from "redux-saga/effects";
import { DELETE_PRODUCT_SUB_CATEGORY } from "./Constant";
import { deleteProductSubCategoryAPI } from "../../services/DeleteProductSubCategory.api";
import {
  deleteProductSubCategory,
  deleteProductSubCategorySuccess,
  deleteProductSubCategoryFailure,
  internalServerFailure,
} from "../redux/DeleteProductSubCategory.redux";
import {
  SuccessResponseState,
  deleteProductSubCategoryByIdPayload,
} from "../../Modal/DeleteProductSubCategory.modal";
import { removeProductSubCategoryById } from "../redux/GetProductSubCategories.redux";

export function* deleteProductSubCategoryAPISaga({
  payload,
}: {
  type: string;
  payload: deleteProductSubCategoryByIdPayload;
}) {
  yield put(deleteProductSubCategory());
  let result: SuccessResponseState;
  try {
    yield put(removeProductSubCategoryById(payload));
    result = yield deleteProductSubCategoryAPI(payload);
    if (result.status === 200) {
      yield put(deleteProductSubCategorySuccess(result));
    } else {
      yield put(deleteProductSubCategoryFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* deleteProductSubCategorySaga() {
  yield takeEvery(DELETE_PRODUCT_SUB_CATEGORY, deleteProductSubCategoryAPISaga);
}
