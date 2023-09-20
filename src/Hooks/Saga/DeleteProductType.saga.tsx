import { takeEvery, put } from "redux-saga/effects";
import { DELETE_PRODUCT_TYPE } from "./Constant";
import { deleteProductTypeAPI } from "../../services/DeleteProductType.api";
import {
  deleteProductType,
  deleteProductTypeSuccess,
  deleteProductTypeFailure,
  internalServerFailure,
} from "../redux/DeleteProductType.redux";
import {
  SuccessResponseState,
  deleteProductTypeByIdPayload,
} from "../../Modal/DeleteProductType.modal";
import { removeProductTypeById } from "../redux/GetProductTypes.redux";

export function* deleteProductTypeAPISaga({
  payload,
}: {
  type: string;
  payload: deleteProductTypeByIdPayload;
}) {
  yield put(deleteProductType());
  let result: SuccessResponseState;
  try {
    yield put(removeProductTypeById(payload));
    result = yield deleteProductTypeAPI(payload);
    if (result.status === 200) {
      yield put(deleteProductTypeSuccess(result));
    } else {
      yield put(deleteProductTypeFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* deleteProductTypeSaga() {
  yield takeEvery(DELETE_PRODUCT_TYPE, deleteProductTypeAPISaga);
}
