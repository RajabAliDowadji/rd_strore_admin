import { takeEvery, put } from "redux-saga/effects";
import { GET_PRODUCT_SUB_CATEGORY_BY_ID } from "./Constant";
import { getProductSubCategoryByIdAPI } from "../../services/GetProductSubCategoryById.api";
import {
  getProductSubCategoryById,
  getProductSubCategoryByIdSuccess,
  getProductSubCategoryByIdFailure,
  internalServerFailure,
} from "../redux/GetProductSubCategoryById.redux";
import {
  GetProductSubCategoryByIdPayload,
  SuccessResponseState,
} from "../../Modal/GetProductSubCategoryById.modal";

export function* getProductSubCategoryByIdAPISaga({
  payload,
}: {
  type: string;
  payload: GetProductSubCategoryByIdPayload;
}) {
  yield put(getProductSubCategoryById());
  let result: SuccessResponseState;
  try {
    result = yield getProductSubCategoryByIdAPI(payload);
    if (result.status === 200) {
      yield put(getProductSubCategoryByIdSuccess(result));
    } else {
      yield put(getProductSubCategoryByIdFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getProductSubCategoryByIdSaga() {
  yield takeEvery(
    GET_PRODUCT_SUB_CATEGORY_BY_ID,
    getProductSubCategoryByIdAPISaga
  );
}
