import { takeEvery, put } from "redux-saga/effects";
import { ADD_PRODUCT_CATEGORY, EDIT_PRODUCT_CATEGORY } from "./Constant";
import {
  addProductCategoryAPI,
  editProductCategoryAPI,
} from "../../services/AddEditProductCategory.api";
import {
  addEditProductCategory,
  addEditProductCategorySuccess,
  addEditProductCategoryFailure,
  internalServerFailure,
} from "../redux/AddEditProductCategory.redux";
import {
  SuccessResponseState,
  AddProductCategoryPayload,
  EditProductCategoryPayload,
} from "../../Modal/AddEditProductCategory.modal";

export function* addProductCategoryAPISaga({
  payload,
}: {
  type: string;
  payload: AddProductCategoryPayload;
}) {
  yield put(addEditProductCategory());
  let result: SuccessResponseState;
  try {
    result = yield addProductCategoryAPI(payload);
    if (result.status === 201) {
      yield put(addEditProductCategorySuccess(result));
    } else {
      yield put(addEditProductCategoryFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* addProductCategorySaga() {
  yield takeEvery(ADD_PRODUCT_CATEGORY, addProductCategoryAPISaga);
}

export function* editProductCategoryAPISaga({
  payload,
}: {
  type: string;
  payload: EditProductCategoryPayload;
}) {
  yield put(addEditProductCategory());
  let result: SuccessResponseState;
  try {
    result = yield editProductCategoryAPI(payload);
    if (result.status === 200) {
      yield put(addEditProductCategorySuccess(result));
    } else {
      yield put(addEditProductCategoryFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* editProductCategorySaga() {
  yield takeEvery(EDIT_PRODUCT_CATEGORY, editProductCategoryAPISaga);
}
