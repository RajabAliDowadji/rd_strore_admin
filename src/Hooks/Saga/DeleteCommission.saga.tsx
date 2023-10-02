import { takeEvery, put } from "redux-saga/effects";
import { DELETE_COMMISSION } from "./Constant";
import { deleteCommissionAPI } from "../../services/DeleteCommission.api";
import {
  deleteCommission,
  deleteCommissionSuccess,
  deleteCommissionFailure,
  internalServerFailure,
} from "../redux/DeleteCommission.redux";
import {
  SuccessResponseState,
  deleteCommissionByIdPayload,
} from "../../Modal/DeleteCommission.modal";
import { removeCommissionById } from "../redux/GetCommissions.redux";

export function* deleteCommissionAPISaga({
  payload,
}: {
  type: string;
  payload: deleteCommissionByIdPayload;
}) {
  yield put(deleteCommission());
  let result: SuccessResponseState;
  try {
    yield put(removeCommissionById(payload));
    result = yield deleteCommissionAPI(payload);
    if (result.status === 200) {
      yield put(deleteCommissionSuccess(result));
    } else {
      yield put(deleteCommissionFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* deleteCommissionSaga() {
  yield takeEvery(DELETE_COMMISSION, deleteCommissionAPISaga);
}
