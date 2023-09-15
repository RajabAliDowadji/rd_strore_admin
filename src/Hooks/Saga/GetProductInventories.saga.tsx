import { takeEvery, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { GET_PRODUCT_INVENTORIES } from "./Constant";
import { getProductInventoriesAPI } from "../../services/GetProductInventories.api";
import {
  getProductInventories,
  getProductInventoriesSuccess,
  getProductInventoriesFailure,
  internalServerFailure,
} from "../redux/GetProductInventories.redux";

export function* getProductInventoriesAPISaga() {
  yield put(getProductInventories());
  let result: AxiosResponse;
  try {
    result = yield getProductInventoriesAPI();
    if (result.data.status === 200) {
      yield put(getProductInventoriesSuccess(result));
    } else {
      yield put(getProductInventoriesFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getProductInventoriesSaga() {
  yield takeEvery(GET_PRODUCT_INVENTORIES, getProductInventoriesAPISaga);
}
