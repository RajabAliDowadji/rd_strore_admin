import { takeEvery, put } from "redux-saga/effects";
import { GET_PRODUCTS } from "./Constant";
import { getProductsAPI } from "../../services/GetProducts.api";
import {
  getProducts,
  getProductsSuccess,
  getProductsFailure,
  internalServerFailure,
} from "../redux/GetProducts.redux";
import {
  GetProductQueryPayloads,
  SuccessResponseState,
} from "../../Modal/GetProducts.modal";

export function* getProductsAPISaga({
  payload,
}: {
  type: string;
  payload: GetProductQueryPayloads;
}) {
  yield put(getProducts());
  let result: SuccessResponseState;
  try {
    result = yield getProductsAPI(payload);
    if (result.status === 200) {
      yield put(getProductsSuccess(result));
    } else {
      yield put(getProductsFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getProductsSaga() {
  yield takeEvery(GET_PRODUCTS, getProductsAPISaga);
}
