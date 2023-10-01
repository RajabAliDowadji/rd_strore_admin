import { takeEvery, put } from "redux-saga/effects";
import { GET_PRODUCT_BY_ID } from "./Constant";
import { getProductByIdAPI } from "../../services/GetProductById.api";
import {
  getProductById,
  getProductByIdSuccess,
  getProductByIdFailure,
  internalServerFailure,
} from "../redux/GetProductById.redux";
import {
  GetProductByIdPayload,
  SuccessResponseState,
} from "../../Modal/GetProductById.modal";

export function* getProductByIdAPISaga({
  payload,
}: {
  type: string;
  payload: GetProductByIdPayload;
}) {
  yield put(getProductById());
  let result: SuccessResponseState;
  try {
    result = yield getProductByIdAPI(payload);
    if (result.status === 200) {
      yield put(getProductByIdSuccess(result));
    } else {
      yield put(getProductByIdFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getProductByIdSaga() {
  yield takeEvery(GET_PRODUCT_BY_ID, getProductByIdAPISaga);
}
