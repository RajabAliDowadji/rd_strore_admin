import { takeEvery, put } from "redux-saga/effects";
import {
  ADD_PRODUCT_SUB_CATEGORY,
  EDIT_PRODUCT_SUB_CATEGORY,
} from "./Constant";
import {
  addProductSubCategoryAPI,
  editProductSubCategoryAPI,
} from "../../services/AddEditProductSubCategory.api";
import {
  addEditProductSubCategory,
  addEditProductSubCategorySuccess,
  addEditProductSubCategoryFailure,
  internalServerFailure,
} from "../redux/AddEditProductSubCategory.redux";
import {
  SuccessResponseState,
  AddProductSubCategoryPayload,
  EditProductSubCategoryPayload,
} from "../../Modal/AddEditProductSubCategory.modal";

export function* addProductSubCategoryAPISaga({
  payload,
}: {
  type: string;
  payload: AddProductSubCategoryPayload;
}) {
  yield put(addEditProductSubCategory());
  let result: SuccessResponseState;
  try {
    result = yield addProductSubCategoryAPI(payload);
    if (result.status === 201) {
      yield put(addEditProductSubCategorySuccess(result));
    } else {
      yield put(addEditProductSubCategoryFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* addProductSubCategorySaga() {
  yield takeEvery(ADD_PRODUCT_SUB_CATEGORY, addProductSubCategoryAPISaga);
}

export function* editProductSubCategoryAPISaga({
  payload,
}: {
  type: string;
  payload: EditProductSubCategoryPayload;
}) {
  yield put(addEditProductSubCategory());
  let result: SuccessResponseState;
  try {
    result = yield editProductSubCategoryAPI(payload);
    if (result.status === 200) {
      yield put(addEditProductSubCategorySuccess(result));
    } else {
      yield put(addEditProductSubCategoryFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* editProductSubCategorySaga() {
  yield takeEvery(EDIT_PRODUCT_SUB_CATEGORY, editProductSubCategoryAPISaga);
}
