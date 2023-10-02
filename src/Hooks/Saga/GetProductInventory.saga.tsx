import { takeEvery, put } from "redux-saga/effects";
import { GET_PRODUCT_INVENTORY_BY_ID } from "./Constant";
import { getProductInventoryByIdAPI } from "../../services/GetProductInventoryById.api";
import {
  getProductInventoryById,
  getProductInventoryByIdSuccess,
  getProductInventoryByIdFailure,
  internalServerFailure,
} from "../redux/GetProductInventoryById.redux";
import {
  GetProductInventoryByIdPayload,
  SuccessResponseState,
} from "../../Modal/GetProductInventoryById.modal";

export function* getProductInventoryByIdAPISaga({
  payload,
}: {
  type: string;
  payload: GetProductInventoryByIdPayload;
}) {
  yield put(getProductInventoryById());
  let result: SuccessResponseState;
  try {
    result = yield getProductInventoryByIdAPI(payload);
    if (result.status === 200) {
      yield put(getProductInventoryByIdSuccess(result));
    } else {
      yield put(getProductInventoryByIdFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getProductInventoryByIdSaga() {
  yield takeEvery(GET_PRODUCT_INVENTORY_BY_ID, getProductInventoryByIdAPISaga);
}
