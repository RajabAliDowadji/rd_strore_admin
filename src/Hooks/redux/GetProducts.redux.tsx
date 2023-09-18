import { createSlice } from "@reduxjs/toolkit";
import { GetProductsState } from "../../Modal/GetProducts.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
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
      state.products = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getProductsFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
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
