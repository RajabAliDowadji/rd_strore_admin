import { takeEvery, put } from "redux-saga/effects";
import { GET_PRODUCT_BRAND_BY_ID } from "./Constant";
import { getProductBrandByIdAPI } from "../../services/GetProductBrandById.api";
import {
  getProductBrandById,
  getProductBrandByIdSuccess,
  getProductBrandByIdFailure,
  internalServerFailure,
} from "../redux/GetProductBrandById.redux";
import {
  GetProductBrandByIdPayload,
  SuccessResponseState,
} from "../../Modal/GetProductBrandById.modal";

export function* getProductBrandByIdAPISaga({
  payload,
}: {
  type: string;
  payload: GetProductBrandByIdPayload;
}) {
  yield put(getProductBrandById());
  let result: SuccessResponseState;
  try {
    result = yield getProductBrandByIdAPI(payload);
    if (result.status === 200) {
      yield put(getProductBrandByIdSuccess(result));
    } else {
      yield put(getProductBrandByIdFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}
export default function* getProductBrandByIdSaga() {
  yield takeEvery(GET_PRODUCT_BRAND_BY_ID, getProductBrandByIdAPISaga);
}
