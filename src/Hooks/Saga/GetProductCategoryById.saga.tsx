import { takeEvery, put } from "redux-saga/effects";
import { GET_PRODUCT_CATEGORY_BY_ID } from "./Constant";
import { getProductCategoryByIdAPI } from "../../services/GetProductCategoryById.api";
import {
  getProductCategoryById,
  getProductCategoryByIdSuccess,
  getProductCategoryByIdFailure,
  internalServerFailure,
} from "../redux/GetProductCategoryById.redux";
import {
  GetProductCategoryByIdPayload,
  SuccessResponseState,
} from "../../Modal/GetProductCategoryById.modal";

export function* getProductCategoryByIdAPISaga({
  payload,
}: {
  type: string;
  payload: GetProductCategoryByIdPayload;
}) {
  yield put(getProductCategoryById());
  let result: SuccessResponseState;
  try {
    result = yield getProductCategoryByIdAPI(payload);
    if (result.status === 200) {
      yield put(getProductCategoryByIdSuccess(result));
    } else {
      yield put(getProductCategoryByIdFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getProductCategoryByIdSaga() {
  yield takeEvery(GET_PRODUCT_CATEGORY_BY_ID, getProductCategoryByIdAPISaga);
}
