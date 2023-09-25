import { takeEvery, put } from "redux-saga/effects";
import { DELETE_FILE } from "./Constant";
import { deleteFileAPI } from "../../services/DeleteFile.api";
import {
  deleteFile,
  deleteFileSuccess,
  deleteFileFailure,
  internalServerFailure,
} from "../redux/DeleteFile.redux";
import {
  SuccessResponseState,
  deleteFileByIdPayload,
} from "../../Modal/DeleteFile.modal";

export function* deleteFileAPISaga({
  payload,
}: {
  type: string;
  payload: deleteFileByIdPayload;
}) {
  yield put(deleteFile());
  let result: SuccessResponseState;
  try {
    result = yield deleteFileAPI(payload);
    if (result.status === 200) {
      yield put(deleteFileSuccess(result));
    } else {
      yield put(deleteFileFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* deleteFileSaga() {
  yield takeEvery(DELETE_FILE, deleteFileAPISaga);
}
