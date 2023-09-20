import { takeEvery, put } from "redux-saga/effects";
import { DELETE_COMMISSION_TYPE } from "./Constant";
import { deleteCommissionTypeAPI } from "../../services/DeleteCommissionType.api";
import {
  deleteCommissionType,
  deleteCommissionTypeSuccess,
  deleteCommissionTypeFailure,
  internalServerFailure,
} from "../redux/DeleteCommissionType.redux";
import {
  SuccessResponseState,
  deleteCommissionTypeByIdPayload,
} from "../../Modal/DeleteCommissionType.modal";
import { removeCommissionTypeById } from "../redux/GetCommissionTypes.redux";

export function* deleteCommissionTypeAPISaga({
  payload,
}: {
  type: string;
  payload: deleteCommissionTypeByIdPayload;
}) {
  yield put(deleteCommissionType());
  let result: SuccessResponseState;
  try {
    yield put(removeCommissionTypeById(payload));
    result = yield deleteCommissionTypeAPI(payload);
    if (result.status === 200) {
      yield put(deleteCommissionTypeSuccess(result));
    } else {
      yield put(deleteCommissionTypeFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* deleteCommissionTypeSaga() {
  yield takeEvery(DELETE_COMMISSION_TYPE, deleteCommissionTypeAPISaga);
}
