import { createSlice } from "@reduxjs/toolkit";
import { DeleteProductState } from "../../Modal/DeleteProduct.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
} as DeleteProductState;

const deleteProductSlice = createSlice({
  name: "delete_product",
  initialState,
  reducers: {
    deleteProduct(state) {
      state.isLoading = true;
    },
    deleteProductSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload.message;
    },
    deleteProductFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    deleteProductResetState(state) {
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
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
  deleteProductResetState,
  internalServerFailure,
} = deleteProductSlice.actions;

export default deleteProductSlice.reducer;
