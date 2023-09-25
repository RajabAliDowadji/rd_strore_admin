import { takeEvery, put } from "redux-saga/effects";
import { ADD_FILE } from "./Constant";
import { addFileAPI } from "../../services/AddEditFile.api";
import {
  addEditFile,
  addEditFileSuccess,
  addEditFileFailure,
  internalServerFailure,
} from "../redux/AddEditFile.redux";
import {
  AddFilePayload,
  SuccessResponseState,
} from "../../Modal/AddEditFile.modal";

export function* addFileAPISaga({
  payload,
}: {
  type: string;
  payload: AddFilePayload;
}) {
  yield put(addEditFile());
  let result: SuccessResponseState;
  try {
    result = yield addFileAPI(payload);
    if (result.status === 201) {
      yield put(addEditFileSuccess(result));
    } else {
      yield put(addEditFileFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* addFileSaga() {
  yield takeEvery(ADD_FILE, addFileAPISaga);
}
