import { createSlice } from "@reduxjs/toolkit";
import { DeleteProductBrandState } from "../../Modal/DeleteProductBrand.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
} as DeleteProductBrandState;

const deleteProductBrandSlice = createSlice({
  name: "delete_product_brand",
  initialState,
  reducers: {
    deleteProductBrand(state) {
      state.isLoading = true;
    },
    deleteProductBrandSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload.message;
    },
    deleteProductBrandFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    deleteProductBrandResetState(state) {
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
  deleteProductBrand,
  deleteProductBrandSuccess,
  deleteProductBrandFailure,
  deleteProductBrandResetState,
  internalServerFailure,
} = deleteProductBrandSlice.actions;

export default deleteProductBrandSlice.reducer;
