import { takeEvery, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { GET_PLACE } from "./Constant";
import { getPlaceAPI } from "../../services/GetPlace.api";
import {
  getPlace,
  getPlaceSuccess,
  getPlaceFailure,
  internalServerFailure,
} from "../redux/GetPlace.redux";
import { GetPlacePayload } from "../../Modal/GetPlace.modal";

export function* getPlaceAPISaga({
  payload,
}: {
  type: string;
  payload: GetPlacePayload;
}) {
  yield put(getPlace());
  try {
    let result: AxiosResponse;
    result = yield getPlaceAPI(payload);
    if ((result.data.status = 200)) {
      yield put(getPlaceSuccess(result));
    } else {
      yield put(getPlaceFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getPlaceSaga() {
  yield takeEvery(GET_PLACE, getPlaceAPISaga);
}
