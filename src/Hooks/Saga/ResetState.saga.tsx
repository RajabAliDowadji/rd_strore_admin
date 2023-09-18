import { takeEvery, put } from "redux-saga/effects";
import { RESET_STATE } from "./Constant";
import { addEditPlaceResetState } from "../redux/AddEditPlace.redux";
import { deletePlaceResetState } from "../redux/DeletePlace.redux";
import { getPlaceByIdResetState } from "../redux/GetPlaceById.redux";
import { getPlaceResetState } from "../redux/GetPlace.redux";

export function* resetStateAPISaga({
  payload,
}: {
  type: string;
  payload: any;
}) {
  if (payload.state === "add_edit_place") {
    yield put(addEditPlaceResetState());
    yield put(getPlaceByIdResetState());
    yield put(getPlaceResetState());
  } else if (payload.state === "delete_place") {
    yield put(deletePlaceResetState());
  }
}

export default function* resetStateSaga() {
  yield takeEvery(RESET_STATE, resetStateAPISaga);
}
