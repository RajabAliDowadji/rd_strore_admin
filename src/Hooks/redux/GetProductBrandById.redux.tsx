import { createSlice } from "@reduxjs/toolkit";
import { GetProductBrandByIdState } from "../../Modal/GetProductBrandById.modal";

const initialState = {
  productBrand: null,
  isLoading: false,
  isError: false,
  message: "",
} as GetProductBrandByIdState;

const getProductBrandByIdSlice = createSlice({
  name: "get_product_brand_by_id",
  initialState,
  reducers: {
    getProductBrandById(state) {
      state.isLoading = true;
    },
    getProductBrandByIdSuccess(state, action) {
      state.productBrand = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getProductBrandByIdFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    getProductBrandByIdResetState(state) {
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
  getProductBrandById,
  getProductBrandByIdSuccess,
  getProductBrandByIdFailure,
  getProductBrandByIdResetState,
  internalServerFailure,
} = getProductBrandByIdSlice.actions;

export default getProductBrandByIdSlice.reducer;
