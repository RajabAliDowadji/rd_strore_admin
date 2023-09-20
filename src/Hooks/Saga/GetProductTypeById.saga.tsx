import { takeEvery, put } from "redux-saga/effects";
import { GET_PRODUCT_TYPE_BY_ID } from "./Constant";
import { getProductTypeByIdAPI } from "../../services/GetProductTypeById.api";
import {
  getProductTypeById,
  getProductTypeByIdSuccess,
  getProductTypeByIdFailure,
  internalServerFailure,
} from "../redux/GetProductTypeById.redux";
import {
  GetProductTypeByIdPayload,
  SuccessResponseState,
} from "../../Modal/GetProductTypeById.modal";

export function* getProductTypeByIdAPISaga({
  payload,
}: {
  type: string;
  payload: GetProductTypeByIdPayload;
}) {
  yield put(getProductTypeById());
  let result: SuccessResponseState;
  try {
    result = yield getProductTypeByIdAPI(payload);
    if (result.status === 200) {
      yield put(getProductTypeByIdSuccess(result));
    } else {
      yield put(getProductTypeByIdFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getProductTypeByIdSaga() {
  yield takeEvery(GET_PRODUCT_TYPE_BY_ID, getProductTypeByIdAPISaga);
}
