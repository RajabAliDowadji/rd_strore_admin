import { createSlice } from "@reduxjs/toolkit";
import { AddEditProductSubCategoryState } from "../../Modal/AddEditProductSubCategory.modal";

const initialState = {
  productSubCategory: null,
  isLoading: false,
  isError: false,
  message: "",
} as AddEditProductSubCategoryState;

const addEditProductSubCategorySlice = createSlice({
  name: "add_edit_product_sub_category",
  initialState,
  reducers: {
    addEditProductSubCategory(state) {
      state.isLoading = true;
    },
    addEditProductSubCategorySuccess(state, action) {
      state.productSubCategory = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    addEditProductSubCategoryFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    addEditProductSubCategoryResetState(state) {
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
  addEditProductSubCategory,
  addEditProductSubCategorySuccess,
  addEditProductSubCategoryFailure,
  addEditProductSubCategoryResetState,
  internalServerFailure,
} = addEditProductSubCategorySlice.actions;

export default addEditProductSubCategorySlice.reducer;
