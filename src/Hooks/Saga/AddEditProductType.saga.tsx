import { takeEvery, put } from "redux-saga/effects";
import { ADD_PRODUCT_TYPE, EDIT_PRODUCT_TYPE } from "./Constant";
import {
  addProductTypeAPI,
  editProductTypeAPI,
} from "../../services/AddEditProductType.api";
import {
  addEditProductType,
  addEditProductTypeSuccess,
  addEditProductTypeFailure,
  internalServerFailure,
} from "../redux/AddEditProductType.redux";
import {
  SuccessResponseState,
  AddProductTypePayload,
  EditProductTypePayload,
} from "../../Modal/AddEditProductType.modal";

export function* addProductTypeAPISaga({
  payload,
}: {
  type: string;
  payload: AddProductTypePayload;
}) {
  yield put(addEditProductType());
  let result: SuccessResponseState;
  try {
    result = yield addProductTypeAPI(payload);
    if (result.status === 201) {
      yield put(addEditProductTypeSuccess(result));
    } else {
      yield put(addEditProductTypeFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* addProductTypeSaga() {
  yield takeEvery(ADD_PRODUCT_TYPE, addProductTypeAPISaga);
}

export function* editProductTypeAPISaga({
  payload,
}: {
  type: string;
  payload: EditProductTypePayload;
}) {
  yield put(addEditProductType());
  let result: SuccessResponseState;
  try {
    result = yield editProductTypeAPI(payload);
    if (result.status === 200) {
      yield put(addEditProductTypeSuccess(result));
    } else {
      yield put(addEditProductTypeFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* editProductTypeSaga() {
  yield takeEvery(EDIT_PRODUCT_TYPE, editProductTypeAPISaga);
}
