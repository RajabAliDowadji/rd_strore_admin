import { createSlice } from "@reduxjs/toolkit";
import {
  GetProductBrandsState,
  ProductBrand,
} from "../../Modal/GetProductBrands.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
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
      state.productBrands = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getProductBrandsFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    removeProductBrandById(state, action) {
      state.productBrands = state.productBrands.filter(
        (productBrand: ProductBrand) => productBrand._id !== action.payload.id
      );
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
  removeProductBrandById,
  internalServerFailure,
} = getProductBrandsSlice.actions;

export default getProductBrandsSlice.reducer;
