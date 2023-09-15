import { takeEvery, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { GET_SHOPS } from "./Constant";
import { getShopsAPI } from "../../services/GetShops.api";
import {
  getShops,
  getShopsSuccess,
  getShopsFailure,
  internalServerFailure,
} from "../redux/GetShops.redux";

export function* getShopsAPISaga() {
  yield put(getShops());
  let result: AxiosResponse;
  try {
    result = yield getShopsAPI();
    if (result.data.status === 200) {
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
