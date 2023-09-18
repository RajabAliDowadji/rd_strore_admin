import { takeEvery, put } from "redux-saga/effects";
import { GET_SHOPS } from "./Constant";
import { getShopsAPI } from "../../services/GetShops.api";
import {
  getShops,
  getShopsSuccess,
  getShopsFailure,
  internalServerFailure,
} from "../redux/GetShops.redux";
import { SuccessResponseState } from "../../Modal/GetShops.modal";

export function* getShopsAPISaga() {
  yield put(getShops());
  let result: SuccessResponseState;
  try {
    result = yield getShopsAPI();
    if (result.status === 200) {
      yield put(getShopsSuccess(result));
    } else {
      yield put(getShopsFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getShopsSaga() {
  yield takeEvery(GET_SHOPS, getShopsAPISaga);
}
