import { createSlice } from "@reduxjs/toolkit";
import { GetProductCategoriesState } from "../../Modal/GetProductCategories.modal";

const initialState = {
  productCategories: [],
  isLoading: false,
  isError: false,
  isErrorMessage: "",
} as GetProductCategoriesState;

const getProductCategoriesSlice = createSlice({
  name: "get_product_categories",
  initialState,
  reducers: {
    getProductCategories(state) {
      state.isLoading = true;
    },
    getProductCategoriesSuccess(state, action) {
      state.productCategories = action.payload.data.data;
      state.isLoading = false;
    },
    getProductCategoriesFailure(state, action) {
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
  getProductCategories,
  getProductCategoriesSuccess,
  getProductCategoriesFailure,
  internalServerFailure,
} = getProductCategoriesSlice.actions;

export default getProductCategoriesSlice.reducer;
