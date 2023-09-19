import { createSlice } from "@reduxjs/toolkit";
import {
  GetShopCategoriesState,
  ShopCategory,
} from "../../Modal/GetShopCategories.modal";

const initialState = {
  shopCategories: [],
  isLoading: false,
  isError: false,
  message: "",
} as GetShopCategoriesState;

const getShopCategoriesSlice = createSlice({
  name: "get_shop_categories",
  initialState,
  reducers: {
    getShopCategories(state) {
      state.isLoading = true;
    },
    getShopCategoriesSuccess(state, action) {
      state.shopCategories = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getShopCategoriesFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    removeShopCategoryById(state, action) {
      state.shopCategories = state.shopCategories.filter(
        (shopCategoey: ShopCategory) => shopCategoey._id !== action.payload.id
      );
    },
    internalServerFailure(state) {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

export const {
  getShopCategories,
  getShopCategoriesSuccess,
  getShopCategoriesFailure,
  removeShopCategoryById,
  internalServerFailure,
} = getShopCategoriesSlice.actions;

export default getShopCategoriesSlice.reducer;
