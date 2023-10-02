import { takeEvery, put } from "redux-saga/effects";
import { ADD_COMMISSION, EDIT_COMMISSION } from "./Constant";
import {
  addCommissionAPI,
  editCommissionAPI,
} from "../../services/AddEditCommission.api";
import {
  addEditCommission,
  addEditCommissionSuccess,
  addEditCommissionFailure,
  internalServerFailure,
} from "../redux/AddEditCommission.redux";
import {
  SuccessResponseState,
  AddCommissionPayload,
  EditCommissionPayload,
} from "../../Modal/AddEditCommission.modal";

export function* addCommissionAPISaga({
  payload,
}: {
  type: string;
  payload: AddCommissionPayload;
}) {
  yield put(addEditCommission());
  let result: SuccessResponseState;
  try {
    result = yield addCommissionAPI(payload);
    if (result.status === 201) {
      yield put(addEditCommissionSuccess(result));
    } else {
      yield put(addEditCommissionFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* addCommissionSaga() {
  yield takeEvery(ADD_COMMISSION, addCommissionAPISaga);
}

export function* editCommissionAPISaga({
  payload,
}: {
  type: string;
  payload: EditCommissionPayload;
}) {
  yield put(addEditCommission());
  let result: SuccessResponseState;
  try {
    result = yield editCommissionAPI(payload);
    if (result.status === 200) {
      yield put(addEditCommissionSuccess(result));
    } else {
      yield put(addEditCommissionFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* editCommissionSaga() {
  yield takeEvery(EDIT_COMMISSION, editCommissionAPISaga);
}
