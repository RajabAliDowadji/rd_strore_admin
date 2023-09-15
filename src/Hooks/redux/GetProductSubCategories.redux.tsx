import { createSlice } from "@reduxjs/toolkit";
import { GetProductSubCategoriesState } from "../../Modal/GetProductSubCategories.modal";

const initialState = {
  isLoading: false,
  isError: false,
  isErrorMessage: "",
  productSubCategories: [],
} as GetProductSubCategoriesState;

const getProductSubCategoriesSlice = createSlice({
  name: "get_product_sub_categories",
  initialState,
  reducers: {
    getProductSubCategories(state) {
      state.isLoading = true;
    },
    getProductSubCategoriesSuccess(state, action) {
      state.productSubCategories = action.payload.data.data;
      state.isLoading = false;
    },
    getProductSubCategoriesFailure(state, action) {
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
  getProductSubCategories,
  getProductSubCategoriesSuccess,
  getProductSubCategoriesFailure,
  internalServerFailure,
} = getProductSubCategoriesSlice.actions;

export default getProductSubCategoriesSlice.reducer;
