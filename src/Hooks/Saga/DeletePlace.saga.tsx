import { takeEvery, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { DELETE_PLACE } from "./Constant";
import { deletePlaceAPI } from "../../services/DeletePlace.api";
import {
  deletePlace,
  deletePlaceSuccess,
  deletePlaceFailure,
  internalServerFailure,
} from "../redux/DeletePlace.redux";
import { deletePlaceByIdPayload } from "../../Modal/DeletePlace.modal";

export function* deletePlaceAPISaga({
  payload,
}: {
  type: string;
  payload: deletePlaceByIdPayload;
}) {
  yield put(deletePlace());
  let result: AxiosResponse;
  try {
    result = yield deletePlaceAPI(payload);
    if (result.data.status === 200) {
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
