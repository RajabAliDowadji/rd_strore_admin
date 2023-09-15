import { createSlice } from "@reduxjs/toolkit";
import { GetProductsState } from "../../Modal/GetProducts.modal";

const initialState = {
  isLoading: false,
  isError: false,
  isErrorMessage: "",
  products: [],
} as GetProductsState;

const getProductsSlice = createSlice({
  name: "get_products",
  initialState,
  reducers: {
    getProducts(state) {
      state.isLoading = true;
    },
    getProductsSuccess(state, action) {
      state.products = action.payload.data.data;
      state.isLoading = false;
    },
    getProductsFailure(state, action) {
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
  getProducts,
  getProductsSuccess,
  getProductsFailure,
  internalServerFailure,
} = getProductsSlice.actions;

export default getProductsSlice.reducer;
