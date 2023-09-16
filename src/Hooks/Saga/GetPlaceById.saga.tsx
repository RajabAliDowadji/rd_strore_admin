import { takeEvery, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { GET_PLACE_BY_ID } from "./Constant";
import { getPlaceByIdAPI } from "../../services/GetPlaceById.api";
import {
  getPlaceById,
  getPlaceByIdSuccess,
  getPlaceByIdFailure,
  internalServerFailure,
} from "../redux/GetPlaceById.redux";
import { GetPlaceByIdPayload } from "../../Modal/GetPlaceById.modal";

export function* getPlaceByIdPISaga({
  payload,
}: {
  type: string;
  payload: GetPlaceByIdPayload;
}) {
  yield put(getPlaceById());
  let result: AxiosResponse;
  try {
    result = yield getPlaceByIdAPI(payload);
    if (result.data.status === 200) {
      yield put(getPlaceByIdSuccess(result));
    } else {
      yield put(getPlaceByIdFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getPlaceByIdSaga() {
  yield takeEvery(GET_PLACE_BY_ID, getPlaceByIdPISaga);
}
