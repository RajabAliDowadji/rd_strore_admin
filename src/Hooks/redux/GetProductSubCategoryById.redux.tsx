import { createSlice } from "@reduxjs/toolkit";
import { GetProductSubCategoryByIdState } from "../../Modal/GetProductSubCategoryById.modal";

const initialState = {
  productSubCategory: null,
  isLoading: false,
  isError: false,
  message: "",
} as GetProductSubCategoryByIdState;

const getProductSubCategoryByIdSlice = createSlice({
  name: "get_product_sub_category_by_id",
  initialState,
  reducers: {
    getProductSubCategoryById(state) {
      state.isLoading = true;
    },
    getProductSubCategoryByIdSuccess(state, action) {
      state.productSubCategory = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getProductSubCategoryByIdFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    getProductSubCategoryByIdResetState(state) {
      state.productSubCategory = null;
      state.message = "";
      state.isLoading = false;
      state.isError = false;
    },
    internalServerFailure(state) {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

export const {
  getProductSubCategoryById,
  getProductSubCategoryByIdSuccess,
  getProductSubCategoryByIdFailure,
  getProductSubCategoryByIdResetState,
  internalServerFailure,
} = getProductSubCategoryByIdSlice.actions;

export default getProductSubCategoryByIdSlice.reducer;
