import { createSlice } from "@reduxjs/toolkit";
import {
  GetProductCategoriesState,
  ProductCategory,
} from "../../Modal/GetProductCategories.modal";

const initialState = {
  productCategories: [],
  isLoading: false,
  isError: false,
  message: "",
} as GetProductCategoriesState;

const getProductCategoriesSlice = createSlice({
  name: "get_product_categories",
  initialState,
  reducers: {
    getProductCategories(state) {
      state.isLoading = true;
    },
    getProductCategoriesSuccess(state, action) {
      state.productCategories = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getProductCategoriesFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    removeProductCategoryById(state, action) {
      state.productCategories = state.productCategories.filter(
        (productCategory: ProductCategory) =>
          productCategory._id !== action.payload.id
      );
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
  removeProductCategoryById,
  internalServerFailure,
} = getProductCategoriesSlice.actions;

export default getProductCategoriesSlice.reducer;
