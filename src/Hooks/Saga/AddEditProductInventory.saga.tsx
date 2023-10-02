import { takeEvery, put } from "redux-saga/effects";
import { ADD_PRODUCT_INVENTORY, EDIT_PRODUCT_INVENTORY } from "./Constant";
import {
  addProductInventoryAPI,
  editProductInventoryAPI,
} from "../../services/AddEditProductInventory.api";
import {
  addEditProductInventory,
  addEditProductInventorySuccess,
  addEditProductInventoryFailure,
  internalServerFailure,
} from "../redux/AddEditProductInventory.redux";
import {
  SuccessResponseState,
  AddProductInventoryPayload,
  EditProductInventoryPayload,
} from "../../Modal/AddEditProductInventory.modal";

export function* addProductInventoryAPISaga({
  payload,
}: {
  type: string;
  payload: AddProductInventoryPayload;
}) {
  yield put(addEditProductInventory());
  let result: SuccessResponseState;
  try {
    result = yield addProductInventoryAPI(payload);
    if (result.status === 201) {
      yield put(addEditProductInventorySuccess(result));
    } else {
      yield put(addEditProductInventoryFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* addProductInventorySaga() {
  yield takeEvery(ADD_PRODUCT_INVENTORY, addProductInventoryAPISaga);
}

export function* editProductInventoryAPISaga({
  payload,
}: {
  type: string;
  payload: EditProductInventoryPayload;
}) {
  yield put(addEditProductInventory());
  let result: SuccessResponseState;
  try {
    result = yield editProductInventoryAPI(payload);
    if (result.status === 200) {
      yield put(addEditProductInventorySuccess(result));
    } else {
      yield put(addEditProductInventoryFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* editProductInventorySaga() {
  yield takeEvery(EDIT_PRODUCT_INVENTORY, editProductInventoryAPISaga);
}
