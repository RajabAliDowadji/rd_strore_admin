import { takeEvery, put } from "redux-saga/effects";
import { GET_SHOP_BY_ID } from "./Constant";
import { getShopByIdAPI } from "../../services/GetShopById.api";
import {
  getShopById,
  getShopByIdSuccess,
  getShopByIdFailure,
  internalServerFailure,
} from "../redux/GetShopById.redux";
import {
  GetShopByIdPayload,
  SuccessResponseState,
} from "../../Modal/GetShopById.modal";

export function* getShopByIdAPISaga({
  payload,
}: {
  type: string;
  payload: GetShopByIdPayload;
}) {
  yield put(getShopById());
  let result: SuccessResponseState;
  try {
    result = yield getShopByIdAPI(payload);
    if (result.status === 200) {
      yield put(getShopByIdSuccess(result));
    } else {
      yield put(getShopByIdFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getShopByIdSaga() {
  yield takeEvery(GET_SHOP_BY_ID, getShopByIdAPISaga);
}
