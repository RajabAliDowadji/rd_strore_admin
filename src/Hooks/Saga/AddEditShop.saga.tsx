import { takeEvery, put } from "redux-saga/effects";
import { ADD_SHOP, EDIT_SHOP } from "./Constant";
import { addShopAPI, editShopAPI } from "../../services/AddEditShop.api";
import {
  addEditShop,
  addEditShopSuccess,
  addEditShopFailure,
  internalServerFailure,
} from "../redux/AddEditShop.redux";
import {
  AddShopPayload,
  EditShopPayload,
  SuccessResponseState,
} from "../../Modal/AddEditShop.modal";

export function* addShopAPISaga({
  payload,
}: {
  type: string;
  payload: AddShopPayload;
}) {
  yield put(addEditShop());
  let result: SuccessResponseState;
  try {
    result = yield addShopAPI(payload);
    if (result.status === 201) {
      yield put(addEditShopSuccess(result));
    } else {
      yield put(addEditShopFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* addShopSaga() {
  yield takeEvery(ADD_SHOP, addShopAPISaga);
}

export function* editShopAPISaga({
  payload,
}: {
  type: string;
  payload: EditShopPayload;
}) {
  yield put(addEditShop());
  let result: SuccessResponseState;
  try {
    result = yield editShopAPI(payload);
    if (result.status === 200) {
      yield put(addEditShopSuccess(result));
    } else {
      yield put(addEditShopFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* editShopSaga() {
  yield takeEvery(EDIT_SHOP, editShopAPISaga);
}
