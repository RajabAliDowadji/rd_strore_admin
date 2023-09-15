import { createSlice } from "@reduxjs/toolkit";
import { GetProductBrandsState } from "../../Modal/GetProductBrands.modal";

const initialState = {
  isLoading: false,
  isError: false,
  isErrorMessage: "",
  productBrands: [],
} as GetProductBrandsState;

const getProductBrandsSlice = createSlice({
  name: "get_product_brands",
  initialState,
  reducers: {
    getProductBrands(state) {
      state.isLoading = true;
    },
    getProductBrandsSuccess(state, action) {
      state.productBrands = action.payload.data.data;
      state.isLoading = false;
    },
    getProductBrandsFailure(state, action) {
      state.isError = true;
      state.isErrorMessage = action.payload.data.error.message;
      state.isLoading = false;
    },
    internalServerFailure(state) {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

export const {
  getProductBrands,
  getProductBrandsSuccess,
  getProductBrandsFailure,
  internalServerFailure,
} = getProductBrandsSlice.actions;

export default getProductBrandsSlice.reducer;
