import { takeEvery, put } from "redux-saga/effects";
import { ADD_PRODUCT_BRAND, EDIT_PRODUCT_BRAND } from "./Constant";
import {
  addProductBrandAPI,
  editProductBrandAPI,
} from "../../services/AddEditProductBrand.api";
import {
  addEditProductBrand,
  addEditProductBrandSuccess,
  addEditProductBrandFailure,
  internalServerFailure,
} from "../redux/AddEditProductBrand.reddux";
import {
  SuccessResponseState,
  AddProductBrandPayload,
  EditProductBrandPayload,
} from "../../Modal/AddEditProductBrand.modal";

export function* addProductBrandAPISaga({
  payload,
}: {
  type: string;
  payload: AddProductBrandPayload;
}) {
  yield put(addEditProductBrand());
  let result: SuccessResponseState;
  try {
    result = yield addProductBrandAPI(payload);
    if (result.status === 201) {
      yield put(addEditProductBrandSuccess(result));
    } else {
      yield put(addEditProductBrandFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* addProductBrandSaga() {
  yield takeEvery(ADD_PRODUCT_BRAND, addProductBrandAPISaga);
}

export function* editProductBrandAPISaga({
  payload,
}: {
  type: string;
  payload: EditProductBrandPayload;
}) {
  yield put(addEditProductBrand());
  let result: SuccessResponseState;
  try {
    result = yield editProductBrandAPI(payload);
    if (result.status === 200) {
      yield put(addEditProductBrandSuccess(result));
    } else {
      yield put(addEditProductBrandFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* editProductBrandSaga() {
  yield takeEvery(EDIT_PRODUCT_BRAND, editProductBrandAPISaga);
}
