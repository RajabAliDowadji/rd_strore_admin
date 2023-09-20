import { takeEvery, put } from "redux-saga/effects";
import { DELETE_PRODUCT_CATEGORY } from "./Constant";
import { deleteProductCategoryAPI } from "../../services/DeleteProductCategory.api";
import {
  deleteProductCategory,
  deleteProductCategorySuccess,
  deleteProductCategoryFailure,
  internalServerFailure,
} from "../redux/DeleteProductCategory.redux";
import {
  SuccessResponseState,
  deleteProductCategoryByIdPayload,
} from "../../Modal/DeleteProductCategory.modal";
import { removeProductCategoryById } from "../redux/GetProductCategories.redux";

export function* deleteProductCategoryAPISaga({
  payload,
}: {
  type: string;
  payload: deleteProductCategoryByIdPayload;
}) {
  yield put(deleteProductCategory());
  let result: SuccessResponseState;
  try {
    yield put(removeProductCategoryById(payload));
    result = yield deleteProductCategoryAPI(payload);
    if (result.status === 200) {
      yield put(deleteProductCategorySuccess(result));
    } else {
      yield put(deleteProductCategoryFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* deleteProductCategorySaga() {
  yield takeEvery(DELETE_PRODUCT_CATEGORY, deleteProductCategoryAPISaga);
}
