import { takeEvery, put } from "redux-saga/effects";
import { GET_SHOP_CATEGORY_BY_ID } from "./Constant";
import { getShopCategoryByIdAPI } from "../../services/GetShopCategoryById.api";
import {
  getShopCategoryById,
  getShopCategoryByIdSuccess,
  getShopCategoryByIdFailure,
  internalServerFailure,
} from "../redux/GetShopCategoryById.redux";
import {
  GetShopCategoryByIdPayload,
  SuccessResponseState,
} from "../../Modal/GetShopCategoryById.modal";

export function* getShopCategoryByIdAPISaga({
  payload,
}: {
  type: string;
  payload: GetShopCategoryByIdPayload;
}) {
  yield put(getShopCategoryById());
  let result: SuccessResponseState;
  try {
    result = yield getShopCategoryByIdAPI(payload);
    if (result.status === 200) {
      yield put(getShopCategoryByIdSuccess(result));
    } else {
      yield put(getShopCategoryByIdFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export default function* getShopCategoryByIdSaga() {
  yield takeEvery(GET_SHOP_CATEGORY_BY_ID, getShopCategoryByIdAPISaga);
}
