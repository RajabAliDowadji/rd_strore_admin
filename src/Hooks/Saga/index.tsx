import { all, fork } from "redux-saga/effects";
import userLoginSaga from "./UserLogin.saga";
import getPlacesSaga from "./GetPlaces.saga";
import getShopCategoriesSaga from "./GetShopCategories.saga";
import getCommissionTypesSaga from "./GetCommissionTypes.saga";
import getProductTypesSaga from "./GetProductTypes.saga";
import getProductCategoriesSaga from "./GetProductCategories.saga";
import getProductSubCategoriesSaga from "./GetProductSubCategories.saga";
import getProductBrandsSaga from "./GetProductBrands.saga";
import getShopsSaga from "./GetShops.saga";
import getProductsSaga from "./GetProducts.saga";
import getCommissionsSaga from "./GetCommissions.saga";
import getProductInventoriesSaga from "./GetProductInventories.saga";
import getProductRatingsSaga from "./GetProductRatings.saga";

export default function* rootSaga() {
  yield all([
    fork(userLoginSaga),
    fork(getPlacesSaga),
    fork(getShopCategoriesSaga),
    fork(getCommissionTypesSaga),
    fork(getProductTypesSaga),
    fork(getProductCategoriesSaga),
    fork(getProductSubCategoriesSaga),
    fork(getProductBrandsSaga),
    fork(getShopsSaga),
    fork(getProductsSaga),
    fork(getCommissionsSaga),
    fork(getProductInventoriesSaga),
    fork(getProductRatingsSaga),
  ]);
}
