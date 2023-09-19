import { all, fork } from "redux-saga/effects";
import userLoginSaga from "./UserLogin.saga";
import getPlacesSaga from "./GetPlaces.saga";
import getPlaceSaga from "./GetPlace.saga";
import getPlaceByIdSaga from "./GetPlaceById.saga";
import deletePlaceSaga from "./DeletePlace.saga";
import { addPlaceSaga, editPlaceSaga } from "./AddEditPlace.saga";
import getShopCategoriesSaga from "./GetShopCategories.saga";
import getShopCategeoryByIdSaga from "./GetShopCategoryById.saga";
import deleteShopCategorySaga from "./DeleteShopCategory.saga";
import {
  addShopCategorySaga,
  editShopCategorySaga,
} from "./AddEditShopCategory.saga";
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
import resetStateSaga from "./ResetState.saga";
export default function* rootSaga() {
  yield all([
    fork(userLoginSaga),
    fork(resetStateSaga),

    //Place Saga Start
    fork(getPlacesSaga),
    fork(getPlaceSaga),
    fork(getPlaceByIdSaga),
    fork(addPlaceSaga),
    fork(editPlaceSaga),
    fork(deletePlaceSaga),
    //Place Saga End

    //Shop Category Saga Start
    fork(getShopCategoriesSaga),
    fork(getShopCategeoryByIdSaga),
    fork(addShopCategorySaga),
    fork(editShopCategorySaga),
    fork(deleteShopCategorySaga),
    //Shop Category Saga Start

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
