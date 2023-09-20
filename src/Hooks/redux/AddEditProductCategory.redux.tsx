import { createSlice } from "@reduxjs/toolkit";
import { AddEditProductCategoryState } from "../../Modal/AddEditProductCategory.modal";

const initialState = {
  productCategory: null,
  isLoading: false,
  isError: false,
  message: "",
} as AddEditProductCategoryState;

const addEditProductCategorySlice = createSlice({
  name: "add_edit_product_category",
  initialState,
  reducers: {
    addEditProductCategory(state) {
      state.isLoading = true;
    },
    addEditProductCategorySuccess(state, action) {
      state.productCategory = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    addEditProductCategoryFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    addEditProductCategoryResetState(state) {
      state.productCategory = null;
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
  addEditProductCategory,
  addEditProductCategorySuccess,
  addEditProductCategoryFailure,
  addEditProductCategoryResetState,
  internalServerFailure,
} = addEditProductCategorySlice.actions;

export default addEditProductCategorySlice.reducer;
