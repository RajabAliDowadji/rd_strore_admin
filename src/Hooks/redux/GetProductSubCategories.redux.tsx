import { createSlice } from "@reduxjs/toolkit";
import {
  GetProductSubCategoriesState,
  ProductSubCategory,
} from "../../Modal/GetProductSubCategories.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
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
      state.productSubCategories = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getProductSubCategoriesFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    removeProductSubCategoryById(state, action) {
      state.productSubCategories = state.productSubCategories.filter(
        (productSubCategory: ProductSubCategory) =>
          productSubCategory._id !== action.payload.id
      );
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
  removeProductSubCategoryById,
  internalServerFailure,
} = getProductSubCategoriesSlice.actions;

export default getProductSubCategoriesSlice.reducer;
