import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./UserLogin.redux";
import getPlacesReducer from "./GetPlaces.redux";
import getShopCategoriesReducer from "./GetShopCategories.redux";
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
  get_places: getPlacesReducer,
  get_shop_categories: getShopCategoriesReducer,
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
