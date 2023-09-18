import { takeEvery, put } from "redux-saga/effects";
import { DELETE_PLACE } from "./Constant";
import { deletePlaceAPI } from "../../services/DeletePlace.api";
import {
  deletePlace,
  deletePlaceSuccess,
  deletePlaceFailure,
  internalServerFailure,
} from "../redux/DeletePlace.redux";
import {
  SuccessResponseState,
  deletePlaceByIdPayload,
} from "../../Modal/DeletePlace.modal";
import { removePlaceById } from "../redux/GetPlaces.redux";

export function* deletePlaceAPISaga({
  payload,
}: {
  type: string;
  payload: deletePlaceByIdPayload;
}) {
  yield put(deletePlace());
  let result: SuccessResponseState;
  try {
    yield put(removePlaceById(payload));
    result = yield deletePlaceAPI(payload);
    if (result.status === 200) {
      yield put(deletePlaceSuccess(result));
    } else {
      yield put(deletePlaceFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* deletePlaceSaga() {
  yield takeEvery(DELETE_PLACE, deletePlaceAPISaga);
}
