import { takeEvery, put } from "redux-saga/effects";
import { ADD_PRODUCT, EDIT_PRODUCT } from "./Constant";
import {
  addProductAPI,
  editProductAPI,
} from "../../services/AddEditProduct.api";
import {
  addEditProduct,
  addEditProductSuccess,
  addEditProductFailure,
  internalServerFailure,
} from "../redux/AddEditProduct.redux";
import {
  SuccessResponseState,
  AddProductPayload,
  EditProductPayload,
} from "../../Modal/AddEditProduct.modal";

export function* addProductAPISaga({
  payload,
}: {
  type: string;
  payload: AddProductPayload;
}) {
  yield put(addEditProduct());
  let result: SuccessResponseState;
  try {
    result = yield addProductAPI(payload);
    if (result.status === 201) {
      yield put(addEditProductSuccess(result));
    } else {
      yield put(addEditProductFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* addProductSaga() {
  yield takeEvery(ADD_PRODUCT, addProductAPISaga);
}

export function* editProductAPISaga({
  payload,
}: {
  type: string;
  payload: EditProductPayload;
}) {
  yield put(addEditProduct());
  let result: SuccessResponseState;
  try {
    result = yield editProductAPI(payload);
    if (result.status === 200) {
      yield put(addEditProductSuccess(result));
    } else {
      yield put(addEditProductFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* editProductSaga() {
  yield takeEvery(EDIT_PRODUCT, editProductAPISaga);
}
