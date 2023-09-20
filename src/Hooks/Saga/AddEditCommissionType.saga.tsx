import { takeEvery, put } from "redux-saga/effects";
import { ADD_COMMISSION_TYPE, EDIT_COMMISSION_TYPE } from "./Constant";
import {
  addCommissionTypeAPI,
  editCommissionTypeAPI,
} from "../../services/AddEditCommissionType.api";
import {
  addEditCommissionType,
  addEditCommissionTypeSuccess,
  addEditCommissionTypeFailure,
  internalServerFailure,
} from "../redux/AddEditCommissionType.redux";
import {
  SuccessResponseState,
  AddCommissionTypePayload,
  EditCommissionTypePayload,
} from "../../Modal/AddEditCommissionType.modal";

export function* addCommissionTypeAPISaga({
  payload,
}: {
  type: string;
  payload: AddCommissionTypePayload;
}) {
  yield put(addEditCommissionType());
  let result: SuccessResponseState;
  try {
    result = yield addCommissionTypeAPI(payload);
    if (result.status === 201) {
      yield put(addEditCommissionTypeSuccess(result));
    } else {
      yield put(addEditCommissionTypeFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* addCommissionTypeSaga() {
  yield takeEvery(ADD_COMMISSION_TYPE, addCommissionTypeAPISaga);
}

export function* editCommissionTypeAPISaga({
  payload,
}: {
  type: string;
  payload: EditCommissionTypePayload;
}) {
  yield put(addEditCommissionType());
  let result: SuccessResponseState;
  try {
    result = yield editCommissionTypeAPI(payload);
    if (result.status === 200) {
      yield put(addEditCommissionTypeSuccess(result));
    } else {
      yield put(addEditCommissionTypeFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* editCommissionTypeSaga() {
  yield takeEvery(EDIT_COMMISSION_TYPE, editCommissionTypeAPISaga);
}
