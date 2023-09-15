import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./UserLogin.redux";
import getPlacesReducer from "./GetPlaces.redux";
import getShopCategoriesReducer from "./GetShopCategories.redux";
import getCommissionTypesReducer from "./GetCommissionTypes.redux";
import getProductTypesReducer from "./GetProductTypes.redux";

const rootReducers = combineReducers({
  login_user: userReducer,
  get_places: getPlacesReducer,
  get_shop_categories: getShopCategoriesReducer,
  get_commission_types: getCommissionTypesReducer,
  get_product_types: getProductTypesReducer,
});

export default rootReducers;
