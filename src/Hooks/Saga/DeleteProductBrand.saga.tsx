import { takeEvery, put } from "redux-saga/effects";
import { DELETE_PRODUCT_BRAND } from "./Constant";
import { deleteProductBrandAPI } from "../../services/DeleteProductBrand.api";
import {
  deleteProductBrand,
  deleteProductBrandSuccess,
  deleteProductBrandFailure,
  internalServerFailure,
} from "../redux/DeleteProductBrand.redux";
import {
  SuccessResponseState,
  deleteProductBrandByIdPayload,
} from "../../Modal/DeleteProductBrand.modal";
import { removeProductBrandById } from "../redux/GetProductBrands.redux";

export function* deleteProductBrandAPISaga({
  payload,
}: {
  type: string;
  payload: deleteProductBrandByIdPayload;
}) {
  yield put(deleteProductBrand());
  let result: SuccessResponseState;
  try {
    yield put(removeProductBrandById(payload));
    result = yield deleteProductBrandAPI(payload);
    if (result.status === 200) {
      yield put(deleteProductBrandSuccess(result));
    } else {
      yield put(deleteProductBrandFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* deleteProductBrandSaga() {
  yield takeEvery(DELETE_PRODUCT_BRAND, deleteProductBrandAPISaga);
}
