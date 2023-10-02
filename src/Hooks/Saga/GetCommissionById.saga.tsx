import { takeEvery, put } from "redux-saga/effects";
import { GET_COMMISSION_BY_ID } from "./Constant";
import { getCommissionByIdAPI } from "../../services/GetCommissionById.api";
import {
  getCommissionById,
  getCommissionByIdSuccess,
  getCommissionByIdFailure,
  internalServerFailure,
} from "../redux/GetCommissionById.redux";
import {
  GetCommissionByIdPayload,
  SuccessResponseState,
} from "../../Modal/GetCommissionById.modal";

export function* getCommissionByIdAPISaga({
  payload,
}: {
  type: string;
  payload: GetCommissionByIdPayload;
}) {
  yield put(getCommissionById());
  let result: SuccessResponseState;
  try {
    result = yield getCommissionByIdAPI(payload);
    if (result.status === 200) {
      yield put(getCommissionByIdSuccess(result));
    } else {
      yield put(getCommissionByIdFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getCommissionByIdSaga() {
  yield takeEvery(GET_COMMISSION_BY_ID, getCommissionByIdAPISaga);
}
