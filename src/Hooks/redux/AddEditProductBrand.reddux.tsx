import { createSlice } from "@reduxjs/toolkit";
import { AddEditProductBrandState } from "../../Modal/AddEditProductBrand.modal";

const initialState = {
  productBrand: null,
  isLoading: false,
  isError: false,
  message: "",
} as AddEditProductBrandState;

const addEditProductBrandSlice = createSlice({
  name: "add_edit_product_brand",
  initialState,
  reducers: {
    addEditProductBrand(state) {
      state.isLoading = true;
    },
    addEditProductBrandSuccess(state, action) {
      state.productBrand = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    addEditProductBrandFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    addEditProductBrandResetState(state) {
      state.productBrand = null;
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
  addEditProductBrand,
  addEditProductBrandSuccess,
  addEditProductBrandFailure,
  addEditProductBrandResetState,
  internalServerFailure,
} = addEditProductBrandSlice.actions;

export default addEditProductBrandSlice.reducer;
