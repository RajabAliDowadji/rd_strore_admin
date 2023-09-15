import { createSlice } from "@reduxjs/toolkit";
import { GetProductTypesState } from "../../Modal/GetProductTypes.modal";

const initialState = {
  productTypes: [],
  isLoading: false,
  isError: false,
  isErrorMessage: "",
} as GetProductTypesState;

const getProductTypesSlice = createSlice({
  name: "get_product_types",
  initialState,
  reducers: {
    getProductTypes(state) {
      state.isLoading = true;
    },
    getProductTypesSuccess(state, action) {
      state.productTypes = action.payload.data.data;
      state.isLoading = false;
    },
    getProductTypesFailure(state, action) {
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
  getProductTypes,
  getProductTypesSuccess,
  getProductTypesFailure,
  internalServerFailure,
} = getProductTypesSlice.actions;

export default getProductTypesSlice.reducer;
