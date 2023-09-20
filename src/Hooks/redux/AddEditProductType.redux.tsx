import { createSlice } from "@reduxjs/toolkit";
import { AddEditProductTypeState } from "../../Modal/AddEditProductType.modal";

const initialState = {
  productType: null,
  isLoading: false,
  isError: false,
  message: "",
} as AddEditProductTypeState;

const addEditProductTypeSlice = createSlice({
  name: "add_edit_product_type",
  initialState,
  reducers: {
    addEditProductType(state) {
      state.isLoading = true;
    },
    addEditProductTypeSuccess(state, action) {
      state.productType = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    addEditProductTypeFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    addEditProductTypeResetState(state) {
      state.productType = null;
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
  addEditProductType,
  addEditProductTypeSuccess,
  addEditProductTypeFailure,
  addEditProductTypeResetState,
  internalServerFailure,
} = addEditProductTypeSlice.actions;

export default addEditProductTypeSlice.reducer;
