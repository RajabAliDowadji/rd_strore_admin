import { takeEvery, put } from "redux-saga/effects";
import { ADD_SHOP_BASIC_DETAILS, EDIT_SHOP_BASIC_DETAILS } from "./Constant";
import {
  addEditShopBasicDetails,
  addEditShopBasicDetailsSuccess,
  addEditShopBasicDetailsFailure,
  internalServerFailure,
} from "../redux/AddEditShopBasicDetails.redux";
import {
  AddShopBasicDetailsPayload,
  EditShopBasicDetailsPayload,
  SuccessResponseState,
} from "../../Modal/AddEditShopBasicDetails.modal";
import {
  addShopBasicDetailsAPI,
  editShopBasicDetailsAPI,
} from "../../services/AddEditShopBasicDetails.api";

export function* addShopBasicDetailsAPISaga({
  payload,
}: {
  type: string;
  payload: AddShopBasicDetailsPayload;
}) {
  yield put(addEditShopBasicDetails());
  let result: SuccessResponseState;
  try {
    result = yield addShopBasicDetailsAPI(payload);
    if (result.status === 201) {
      yield put(addEditShopBasicDetailsSuccess(result));
    } else {
      yield put(addEditShopBasicDetailsFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* addShopBasicDetailsSaga() {
  yield takeEvery(ADD_SHOP_BASIC_DETAILS, addShopBasicDetailsAPISaga);
}

export function* editShopBasicDetailsAPISaga({
  payload,
}: {
  type: string;
  payload: EditShopBasicDetailsPayload;
}) {
  yield put(addEditShopBasicDetails());
  let result: SuccessResponseState;
  try {
    result = yield editShopBasicDetailsAPI(payload);
    if (result.status === 200) {
      yield put(addEditShopBasicDetailsSuccess(result));
    } else {
      yield put(addEditShopBasicDetailsFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* editShopBasicDetailsSaga() {
  yield takeEvery(EDIT_SHOP_BASIC_DETAILS, editShopBasicDetailsAPISaga);
}
