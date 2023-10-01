import { takeEvery, put } from "redux-saga/effects";
import { DELETE_PRODUCT } from "./Constant";
import { deleteProductAPI } from "../../services/DeleteProduct.api";
import {
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
  internalServerFailure,
} from "../redux/DeleteProduct.redux";
import {
  SuccessResponseState,
  deleteProductByIdPayload,
} from "../../Modal/DeleteProduct.modal";
import { removeProductById } from "../redux/GetProducts.redux";

export function* deleteProductAPISaga({
  payload,
}: {
  type: string;
  payload: deleteProductByIdPayload;
}) {
  yield put(deleteProduct());
  let result: SuccessResponseState;
  try {
    yield put(removeProductById(payload));
    result = yield deleteProductAPI(payload);
    if (result.status === 200) {
      yield put(deleteProductSuccess(result));
    } else {
      yield put(deleteProductFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* deleteProductSaga() {
  yield takeEvery(DELETE_PRODUCT, deleteProductAPISaga);
}
