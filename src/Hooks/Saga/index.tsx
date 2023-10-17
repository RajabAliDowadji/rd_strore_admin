import { all, fork } from "redux-saga/effects";
import userLoginSaga from "./UserLogin.saga";
import getPlacesSaga from "./GetPlaces.saga";
import getPlaceSaga from "./GetPlace.saga";
import getPlaceByIdSaga from "./GetPlaceById.saga";
import deletePlaceSaga from "./DeletePlace.saga";
import { addPlaceSaga, editPlaceSaga } from "./AddEditPlace.saga";
import getShopCategoriesSaga from "./GetShopCategories.saga";
import getShopCategoryByIdSaga from "./GetShopCategoryById.saga";
import deleteShopCategorySaga from "./DeleteShopCategory.saga";
import {
  addShopCategorySaga,
  editShopCategorySaga,
} from "./AddEditShopCategory.saga";
import getCommissionTypesSaga from "./GetCommissionTypes.saga";
import getCommissionTypeByIdSaga from "./GetCommissionTypeById.saga";
import deleteCommissionTypeSaga from "./DeleteCommissionType.saga";
import {
  addCommissionTypeSaga,
  editCommissionTypeSaga,
} from "./AddEditCommissionType.saga";
import getProductTypesSaga from "./GetProductTypes.saga";
import getProductTypeByIdSaga from "./GetProductTypeById.saga";
import {
  addProductTypeSaga,
  editProductTypeSaga,
} from "./AddEditProductType.saga";
import deleteProductTypeSaga from "./DeleteProductType.saga";
import getProductCategoriesSaga from "./GetProductCategories.saga";
import getProductCategoryByIdSaga from "./GetProductCategoryById.saga";
import {
  addProductCategorySaga,
  editProductCategorySaga,
} from "./AddEditProductCategory.saga";
import deleteProductCategorySaga from "./DeleteProductCategory.saga";
import getProductSubCategoriesSaga from "./GetProductSubCategories.saga";
import getProductSubCategoryByIdSaga from "./GetProductSubCategoryById.saga";
import {
  addProductSubCategorySaga,
  editProductSubCategorySaga,
} from "./AddEditProductSubCategory.saga";
import deleteProductSubCategorySaga from "./DeleteProductSubCategory.saga";
import getProductBrandsSaga from "./GetProductBrands.saga";
import getProductBrandByIdSaga from "./GetProductBrandById.saga";
import {
  addProductBrandSaga,
  editProductBrandSaga,
} from "./AddEditProductBrand.saga";
import deleteProductBrandSaga from "./DeleteProductBrand.saga";
import getShopsSaga from "./GetShops.saga";
import getShopByIdSaga from "./GetShopById.saga";
import { addShopSaga, editShopSaga } from "./AddEditShop.saga";
import deleteShopSaga from "./DeleteShop.saga";
import getProductsSaga from "./GetProducts.saga";
import deleteProductSaga from "./DeleteProduct.saga";
import { addProductSaga, editProductSaga } from "./AddEditProduct.saga";
import getProductByIdSaga from "./GetProductById.saga";
import getProductInventoriesSaga from "./GetProductInventories.saga";
import getProductInventoryByIdSaga from "./GetProductInventory.saga";
import {
  addProductInventorySaga,
  editProductInventorySaga,
} from "./AddEditProductInventory.saga";
import deleteProductInventorySaga from "./DeleteProductInventory.saga";
import getCommissionsSaga from "./GetCommissions.saga";
import {
  addCommissionSaga,
  editCommissionSaga,
} from "./AddEditCommission.saga";
import deleteCommissionSaga from "./DeleteCommission.saga";
import getCommissionByIdSaga from "./GetCommissionById.saga";
import getAdminCommissionSaga from "./GetAdminCommission.saga";

import getProductRatingsSaga from "./GetProductRatings.saga";
import resetStateSaga from "./ResetState.saga";
import { addFilesSaga } from "./AddEditFiles.saga";
import { addFileSaga } from "./AddEditFile.saga";
import deleteFileSaga from "./DeleteFile.saga";

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
    fork(getShopCategoryByIdSaga),
    fork(addShopCategorySaga),
    fork(editShopCategorySaga),
    fork(deleteShopCategorySaga),
    //Shop Category Saga Start

    //Shop Saga Start
    fork(getShopsSaga),
    fork(getShopByIdSaga),
    fork(addShopSaga),
    fork(editShopSaga),
    fork(deleteShopSaga),
    //Shop Saga Start

    //Commission Type Saga Start
    fork(getCommissionTypesSaga),
    fork(getCommissionTypeByIdSaga),
    fork(addCommissionTypeSaga),
    fork(editCommissionTypeSaga),
    fork(deleteCommissionTypeSaga),
    //Commission Type Saga Start

    //Product Type Saga Start
    fork(getProductTypesSaga),
    fork(getProductTypeByIdSaga),
    fork(addProductTypeSaga),
    fork(editProductTypeSaga),
    fork(deleteProductTypeSaga),
    //Product Type Saga Start

    //Product Category Saga Start
    fork(getProductCategoriesSaga),
    fork(getProductCategoryByIdSaga),
    fork(addProductCategorySaga),
    fork(editProductCategorySaga),
    fork(deleteProductCategorySaga),
    //Product Category Saga End

    //Product Sub-Category Saga Start
    fork(getProductSubCategoriesSaga),
    fork(getProductSubCategoryByIdSaga),
    fork(addProductSubCategorySaga),
    fork(editProductSubCategorySaga),
    fork(deleteProductSubCategorySaga),
    //Product Sub-Category Saga End

    //Product Brand Saga Start
    fork(getProductBrandsSaga),
    fork(getProductBrandByIdSaga),
    fork(addProductBrandSaga),
    fork(editProductBrandSaga),
    fork(deleteProductBrandSaga),
    //Product Brand Saga End

    //File Saga Start
    fork(addFileSaga),
    fork(addFilesSaga),
    fork(deleteFileSaga),
    //File Saga End

    //Product Saga Start
    fork(getProductsSaga),
    fork(getProductByIdSaga),
    fork(addProductSaga),
    fork(editProductSaga),
    fork(deleteProductSaga),
    //Product Saga End

    //Product Inventory Saga Start
    fork(getProductInventoriesSaga),
    fork(getProductInventoryByIdSaga),
    fork(addProductInventorySaga),
    fork(editProductInventorySaga),
    fork(deleteProductInventorySaga),
    //Product Inventory Saga End

    //Commission Type Saga Start
    fork(getCommissionsSaga),
    fork(getCommissionByIdSaga),
    fork(addCommissionSaga),
    fork(editCommissionSaga),
    fork(deleteCommissionSaga),
    //Commission Type Saga Start

    // Admin Commission Type Saga Start
    fork(getAdminCommissionSaga),
    // Admin Commission Type Saga Start

    fork(getProductRatingsSaga),
  ]);
}
