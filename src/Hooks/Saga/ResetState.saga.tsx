import { takeEvery, put } from "redux-saga/effects";
import { RESET_STATE } from "./Constant";
import { addEditPlaceResetState } from "../redux/AddEditPlace.redux";
import { deletePlaceResetState } from "../redux/DeletePlace.redux";
import { getPlaceByIdResetState } from "../redux/GetPlaceById.redux";
import { getPlaceResetState } from "../redux/GetPlace.redux";
import { deleteShopCategoryResetState } from "../redux/DeleteShopCategory.redux";
import { addEditShopCategoryResetState } from "../redux/AddEditShopCategory.redux";
import { getShopCategoryByIdResetState } from "../redux/GetShopCategoryById.redux";

export function* resetStateAPISaga({
  payload,
}: {
  type: string;
  payload: any;
}) {
  if (payload.state === "place") {
    yield put(addEditPlaceResetState());
    yield put(getPlaceByIdResetState());
    yield put(getPlaceResetState());
    yield put(deletePlaceResetState());
  } else if (payload.state === "shop_category") {
    yield put(addEditShopCategoryResetState());
    yield put(getShopCategoryByIdResetState());
    yield put(deleteShopCategoryResetState());
  }
}

export default function* resetStateSaga() {
  yield takeEvery(RESET_STATE, resetStateAPISaga);
}
