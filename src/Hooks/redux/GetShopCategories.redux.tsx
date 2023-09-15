import { createSlice } from "@reduxjs/toolkit";
import { GetShopCategoriesState } from "../../Modal/GetShopCategories.modal";

const initialState = {
  shopCategories: [],
  isLoading: false,
  isError: false,
  isErrorMessage: "",
} as GetShopCategoriesState;

const getShopCategoriesSlice = createSlice({
  name: "get_shop_categories",
  initialState,
  reducers: {
    getShopCategories(state) {
      state.isLoading = true;
    },
    getShopCategoriesSuccess(state, action) {
      state.shopCategories = action.payload.data.data;
      state.isLoading = false;
    },
    getShopCategoriesFailure(state, action) {
      state.isError = true;
      state.isErrorMessage = action.payload.data.error.message;
      state.isLoading = false;
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
  internalServerFailure,
} = getShopCategoriesSlice.actions;

export default getShopCategoriesSlice.reducer;
