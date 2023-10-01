import { takeEvery, put } from "redux-saga/effects";
import { ADD_FILES } from "./Constant";
import { addFilesAPI } from "../../services/AddEditFiles.api";
import {
  addEditFiles,
  addEditFilesSuccess,
  addEditFilesFailure,
  internalServerFailure,
} from "../redux/AddEditFiles.redux";
import {
  AddFilesPayload,
  SuccessResponseState,
} from "../../Modal/AddEditFiles.modal";

export function* addFilesAPISaga({
  payload,
}: {
  type: string;
  payload: AddFilesPayload;
}) {
  yield put(addEditFiles());
  let result: SuccessResponseState;
  try {
    result = yield addFilesAPI(payload);
    if (result.status === 201) {
      yield put(addEditFilesSuccess(result));
    } else {
      yield put(addEditFilesFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* addFilesSaga() {
  yield takeEvery(ADD_FILES, addFilesAPISaga);
}
