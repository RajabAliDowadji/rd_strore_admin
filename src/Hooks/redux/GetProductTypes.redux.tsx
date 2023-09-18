import { createSlice } from "@reduxjs/toolkit";
import { GetProductTypesState } from "../../Modal/GetProductTypes.modal";

const initialState = {
  productTypes: [],
  isLoading: false,
  isError: false,
  message: "",
} as GetProductTypesState;

const getProductTypesSlice = createSlice({
  name: "get_product_types",
  initialState,
  reducers: {
    getProductTypes(state) {
      state.isLoading = true;
    },
    getProductTypesSuccess(state, action) {
      state.productTypes = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getProductTypesFailure(state, action) {
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
  getProductTypes,
  getProductTypesSuccess,
  getProductTypesFailure,
  internalServerFailure,
} = getProductTypesSlice.actions;

export default getProductTypesSlice.reducer;
