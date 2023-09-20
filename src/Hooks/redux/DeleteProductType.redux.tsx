import { createSlice } from "@reduxjs/toolkit";
import { DeleteProductTypeState } from "../../Modal/DeleteProductType.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
} as DeleteProductTypeState;

const deleteProductTypeSlice = createSlice({
  name: "delete_product_type",
  initialState,
  reducers: {
    deleteProductType(state) {
      state.isLoading = true;
    },
    deleteProductTypeSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload.message;
    },
    deleteProductTypeFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    deleteProductTypeResetState(state) {
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
  deleteProductType,
  deleteProductTypeSuccess,
  deleteProductTypeFailure,
  deleteProductTypeResetState,
  internalServerFailure,
} = deleteProductTypeSlice.actions;

export default deleteProductTypeSlice.reducer;
