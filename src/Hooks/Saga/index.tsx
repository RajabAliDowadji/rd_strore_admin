import { all, fork } from "redux-saga/effects";
import userLoginSaga from "./UserLogin.saga";
import getPlacesSaga from "./GetPlaces.saga";
import getShopCategoriesSaga from "./GetShopCategories.saga";
import getCommissionTypesSaga from "./GetCommissionTypes.saga";
import getProductTypesSaga from "./GetProductTypes.saga";

export default function* rootSaga() {
  yield all([
    fork(userLoginSaga),
    fork(getPlacesSaga),
    fork(getShopCategoriesSaga),
    fork(getCommissionTypesSaga),
    fork(getProductTypesSaga),
  ]);
}
