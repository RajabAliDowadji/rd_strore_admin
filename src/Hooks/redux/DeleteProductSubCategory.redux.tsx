import { createSlice } from "@reduxjs/toolkit";
import { DeleteProductSubCategoryState } from "../../Modal/DeleteProductSubCategory.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
} as DeleteProductSubCategoryState;

const deleteProductSubCategorySlice = createSlice({
  name: "delete_product_sub_category",
  initialState,
  reducers: {
    deleteProductSubCategory(state) {
      state.isLoading = true;
    },
    deleteProductSubCategorySuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload.message;
    },
    deleteProductSubCategoryFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    deleteProductSubCategoryResetState(state) {
      state.isError = false;
      state.message = "";
      state.isLoading = false;
    },
    internalServerFailure(state) {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

export const {
  deleteProductSubCategory,
  deleteProductSubCategorySuccess,
  deleteProductSubCategoryFailure,
  deleteProductSubCategoryResetState,
  internalServerFailure,
} = deleteProductSubCategorySlice.actions;

export default deleteProductSubCategorySlice.reducer;
