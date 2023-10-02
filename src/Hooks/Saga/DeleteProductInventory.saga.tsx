import { takeEvery, put } from "redux-saga/effects";
import { DELETE_PRODUCT_INVENTORY } from "./Constant";
import { deleteProductInventoryAPI } from "../../services/DeleteProductInventory.api";
import {
  deleteProductInventory,
  deleteProductInventorySuccess,
  deleteProductInventoryFailure,
  internalServerFailure,
} from "../redux/DeleteProductInventory.redux";
import {
  SuccessResponseState,
  deleteProductInventoryByIdPayload,
} from "../../Modal/DeleteProductInventory.modal";
import { removeProductInventoryById } from "../redux/GetProductInventories.redux";

export function* deleteProductInventoryAPISaga({
  payload,
}: {
  type: string;
  payload: deleteProductInventoryByIdPayload;
}) {
  yield put(deleteProductInventory());
  let result: SuccessResponseState;
  try {
    yield put(removeProductInventoryById(payload));
    result = yield deleteProductInventoryAPI(payload);
    if (result.status === 200) {
      yield put(deleteProductInventorySuccess(result));
    } else {
      yield put(deleteProductInventoryFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* deleteProductInventorySaga() {
  yield takeEvery(DELETE_PRODUCT_INVENTORY, deleteProductInventoryAPISaga);
}
