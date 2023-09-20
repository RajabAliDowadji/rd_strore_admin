import { createSlice } from "@reduxjs/toolkit";
import { DeleteProductCategoryState } from "../../Modal/DeleteProductCategory.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
} as DeleteProductCategoryState;

const deleteProductCategorySlice = createSlice({
  name: "delete_product_category",
  initialState,
  reducers: {
    deleteProductCategory(state) {
      state.isLoading = true;
    },
    deleteProductCategorySuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload.message;
    },
    deleteProductCategoryFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    deleteProductCategoryResetState(state) {
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
  deleteProductCategory,
  deleteProductCategorySuccess,
  deleteProductCategoryFailure,
  deleteProductCategoryResetState,
  internalServerFailure,
} = deleteProductCategorySlice.actions;

export default deleteProductCategorySlice.reducer;
