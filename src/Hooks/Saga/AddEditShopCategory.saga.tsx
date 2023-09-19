import { takeEvery, put } from "redux-saga/effects";
import { ADD_SHOP_CATEGORY, EDIT_SHOP_CATEGORY } from "./Constant";
import {
  addShopCategoryAPI,
  editShopCategoryAPI,
} from "../../services/AddEditShopCategory.api";
import {
  addEditShopCategory,
  addEditShopCategorySuccess,
  addEditShopCategoryFailure,
  internalServerFailure,
} from "../redux/AddEditShopCategory.redux";
import {
  AddShopCategoryPayload,
  EditShopCategoryPayload,
  SuccessResponseState,
} from "../../Modal/AddEditShopCategory.modal";

export function* addShopCategoryAPISaga({
  payload,
}: {
  type: string;
  payload: AddShopCategoryPayload;
}) {
  yield put(addEditShopCategory());
  let result: SuccessResponseState;
  try {
    result = yield addShopCategoryAPI(payload);
    if (result.status === 201) {
      yield put(addEditShopCategorySuccess(result));
    } else {
      yield put(addEditShopCategoryFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* addShopCategorySaga() {
  yield takeEvery(ADD_SHOP_CATEGORY, addShopCategoryAPISaga);
}

export function* editShopCategoryAPISaga({
  payload,
}: {
  type: string;
  payload: EditShopCategoryPayload;
}) {
  yield put(addEditShopCategory());
  let result: SuccessResponseState;
  try {
    result = yield editShopCategoryAPI(payload);
    if (result.status === 200) {
      yield put(addEditShopCategorySuccess(result));
    } else {
      yield put(addEditShopCategoryFailure(result));
    }
  } catch (e) {
    yield put(internalServerFailure());
  }
}

export function* editShopCategorySaga() {
  yield takeEvery(EDIT_SHOP_CATEGORY, editShopCategoryAPISaga);
}
