import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./UserLogin.redux";
import getPlacesReducer from "./GetPlaces.redux";
import getPlaceReducer from "./GetPlace.redux";
import getPlaceByIdReducer from "./GetPlaceById.redux";
import addEditPlaceReducer from "./AddEditPlace.redux";
import deletePlaceReducer from "./DeletePlace.redux";
import getShopCategoriesReducer from "./GetShopCategories.redux";
import getShoCategoryByIdReducer from "./GetShopCategoryById.redux";
import deleteShopCategoryReducer from "./DeleteShopCategory.redux";
import addEditShopCategoryReducer from "./AddEditShopCategory.redux";
import getCommissionTypesReducer from "./GetCommissionTypes.redux";
import getProductTypesReducer from "./GetProductTypes.redux";
import getProductCategoriesReducer from "./GetProductCategories.redux";
import getProductSubCategoriesReducer from "./GetProductSubCategories.redux";
import getProductBrandsReducer from "./GetProductBrands.redux";
import getShopsReducer from "./GetShops.redux";
import getProductsReducer from "./GetProducts.redux";
import getCommissionsReducer from "./GetCommissions.redux";
import getProductInventoriesReducer from "./GetProductInventories.redux";
import getProductRatingsReducer from "./GetProductRatings.redux";

const rootReducers = combineReducers({
  login_user: userReducer,

  //Place Reducer Start
  get_places: getPlacesReducer,
  get_place: getPlaceReducer,
  get_place_by_id: getPlaceByIdReducer,
  add_edit_place: addEditPlaceReducer,
  delete_place: deletePlaceReducer,
  //Place Reducer End

  //Shop Category Reducer Start
  get_shop_categories: getShopCategoriesReducer,
  get_shop_category_by_id: getShoCategoryByIdReducer,
  delete_shop_category: deleteShopCategoryReducer,
  add_edit_shop_category: addEditShopCategoryReducer,
  //Shop Category Reducer End

  get_commission_types: getCommissionTypesReducer,
  get_product_types: getProductTypesReducer,
  get_product_categories: getProductCategoriesReducer,
  get_product_sub_categories: getProductSubCategoriesReducer,
  get_product_brands: getProductBrandsReducer,
  get_shops: getShopsReducer,
  get_products: getProductsReducer,
  get_commissions: getCommissionsReducer,
  get_product_inventories: getProductInventoriesReducer,
  get_product_ratings: getProductRatingsReducer,
});

export default rootReducers;
