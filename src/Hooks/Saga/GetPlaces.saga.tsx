import { takeEvery, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { GET_PLACES } from "./Constant";
import { getPlacesAPI } from "../../services/GetPlaces.api";
import {
  getPlaces,
  getPlacesSuccess,
  getPlacesFailure,
  internalServerFailure,
} from "../redux/GetPlaces.redux";

export function* getPlacesAPISaga() {
  yield put(getPlaces());
  let result: AxiosResponse;
  try {
    result = yield getPlacesAPI();
    if (result.data.status === 200) {
      yield put(getPlacesSuccess(result));
    } else {
      yield put(getPlacesFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getPlacesSaga() {
  yield takeEvery(GET_PLACES, getPlacesAPISaga);
}
