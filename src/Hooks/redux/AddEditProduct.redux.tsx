import { createSlice } from "@reduxjs/toolkit";
import { AddEditProductState } from "../../Modal/AddEditProduct.modal";

const initialState = {
  product: null,
  isLoading: false,
  isError: false,
  message: "",
} as AddEditProductState;

const addEditProductSlice = createSlice({
  name: "add_edit_product",
  initialState,
  reducers: {
    addEditProduct(state) {
      state.isLoading = true;
    },
    addEditProductSuccess(state, action) {
      state.product = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    addEditProductFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    addEditProductResetState(state) {
      state.product = null;
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
  addEditProduct,
  addEditProductSuccess,
  addEditProductFailure,
  addEditProductResetState,
  internalServerFailure,
} = addEditProductSlice.actions;

export default addEditProductSlice.reducer;
