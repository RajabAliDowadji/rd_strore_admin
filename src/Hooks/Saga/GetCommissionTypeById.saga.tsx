import { takeEvery, put } from "redux-saga/effects";
import { GET_COMMISSION_TYPE_BY_ID } from "./Constant";
import { getCommissionTypeByIdAPI } from "../../services/GetCommissionTypeById.api";
import {
  getCommissionTypeById,
  getCommissionTypeByIdSuccess,
  getCommissionTypeByIdFailure,
  internalServerFailure,
} from "../redux/GetCommissionTypeById.redux";
import {
  GetCommissionTypeByIdPayload,
  SuccessResponseState,
} from "../../Modal/GetCommissionTypeById.modal";

export function* getCommissionTypeByIdAPISaga({
  payload,
}: {
  type: string;
  payload: GetCommissionTypeByIdPayload;
}) {
  yield put(getCommissionTypeById());
  let result: SuccessResponseState;
  try {
    result = yield getCommissionTypeByIdAPI(payload);
    if (result.status === 200) {
      yield put(getCommissionTypeByIdSuccess(result));
    } else {
      yield put(getCommissionTypeByIdFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getCommissionTypeByIdSaga() {
  yield takeEvery(GET_COMMISSION_TYPE_BY_ID, getCommissionTypeByIdAPISaga);
}
