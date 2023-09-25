import { takeEvery, put } from "redux-saga/effects";
import { DELETE_SHOP } from "./Constant";
import { deleteShopAPI } from "../../services/DeleteShop.api";
import {
  deleteShop,
  deleteShopSuccess,
  deleteShopFailure,
  internalServerFailure,
} from "../redux/DeleteShop.redux";
import {
  SuccessResponseState,
  deleteShopByIdPayload,
} from "../../Modal/DeleteShop.modal";
import { removeShopById } from "../redux/GetShops.redux";

export function* deleteShopAPISaga({
  payload,
}: {
  type: string;
  payload: deleteShopByIdPayload;
}) {
  yield put(deleteShop());
  let result: SuccessResponseState;
  try {
    yield put(removeShopById(payload));
    result = yield deleteShopAPI(payload);
    if (result.status === 200) {
      yield put(deleteShopSuccess(result));
    } else {
      yield put(deleteShopFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* deleteShopSaga() {
  yield takeEvery(DELETE_SHOP, deleteShopAPISaga);
}
