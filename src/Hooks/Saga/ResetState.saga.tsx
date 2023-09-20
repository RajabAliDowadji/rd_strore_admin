import { takeEvery, put } from "redux-saga/effects";
import { RESET_STATE } from "./Constant";
import { addEditPlaceResetState } from "../redux/AddEditPlace.redux";
import { deletePlaceResetState } from "../redux/DeletePlace.redux";
import { getPlaceByIdResetState } from "../redux/GetPlaceById.redux";
import { getPlaceResetState } from "../redux/GetPlace.redux";
import { deleteShopCategoryResetState } from "../redux/DeleteShopCategory.redux";
import { addEditShopCategoryResetState } from "../redux/AddEditShopCategory.redux";
import { getShopCategoryByIdResetState } from "../redux/GetShopCategoryById.redux";
import { addEditCommissionTypeResetState } from "../redux/AddEditCommissionType.redux";
import { getCommissionTypeByIdResetState } from "../redux/GetCommissionTypeById.redux";
import { deleteCommissionTypeResetState } from "../redux/DeleteCommissionType.redux";
import { addEditProductTypeResetState } from "../redux/AddEditProductType.redux";
import { getProductTypeByIdResetState } from "../redux/GetProductTypeById.redux";
import { deleteProductTypeResetState } from "../redux/DeleteProductType.redux";
import { addEditProductCategoryResetState } from "../redux/AddEditProductCategory.redux";
import { getProductCategoryByIdResetState } from "../redux/GetProductCategoryById.redux";
import { deleteProductCategoryResetState } from "../redux/DeleteProductCategory.redux";

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
  } else if (payload.state === "commission_type") {
    yield put(addEditCommissionTypeResetState());
    yield put(getCommissionTypeByIdResetState());
    yield put(deleteCommissionTypeResetState());
  } else if (payload.state === "product_type") {
    yield put(addEditProductTypeResetState());
    yield put(getProductTypeByIdResetState());
    yield put(deleteProductTypeResetState());
  } else if (payload.state === "product_category") {
    yield put(addEditProductCategoryResetState());
    yield put(getProductCategoryByIdResetState());
    yield put(deleteProductCategoryResetState());
  }
}

export default function* resetStateSaga() {
  yield takeEvery(RESET_STATE, resetStateAPISaga);
}
