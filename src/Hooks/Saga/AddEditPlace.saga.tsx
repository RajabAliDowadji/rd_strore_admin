import { takeEvery, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { ADD_PLACE, EDIT_PLACE } from "./Constant";
import { addPlaceAPI, editPlaceAPI } from "../../services/AddEditPlace.api";
import {
  addEditPlace,
  addEditPlaceSuccess,
  addEditPlaceFailure,
  internalServerFailure,
} from "../redux/AddEditPlace.redux";
import {
  AddPlacePayload,
  EditPlacePayload,
} from "../../Modal/AddEditPlace.modal";

export function* addPlaceAPISaga({
  payload,
}: {
  type: string;
  payload: AddPlacePayload;
}) {
  yield put(addEditPlace());
  let result: AxiosResponse;
  try {
    result = yield addPlaceAPI(payload);
    if (result.data.status === 201) {
      yield put(addEditPlaceSuccess(result));
    } else {
      yield put(addEditPlaceFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* addPlaceSaga() {
  yield takeEvery(ADD_PLACE, addPlaceAPISaga);
}

export function* editPlaceAPISaga({
  payload,
}: {
  type: string;
  payload: EditPlacePayload;
}) {
  yield put(addEditPlace());
  let result: AxiosResponse;
  try {
    result = yield editPlaceAPI(payload);
    if (result.data.status === 200) {
      yield put(addEditPlaceSuccess(result));
    } else {
      yield put(addEditPlaceFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* editPlaceSaga() {
  yield takeEvery(EDIT_PLACE, editPlaceAPISaga);
}
