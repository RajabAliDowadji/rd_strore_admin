import { createSlice } from "@reduxjs/toolkit";
import { GetProductTypeByIdState } from "../../Modal/GetProductTypeById.modal";

const initialState = {
  productType: null,
  isLoading: false,
  isError: false,
  message: "",
} as GetProductTypeByIdState;

const getProductTypeByIdSlice = createSlice({
  name: "get_product_type_by_id",
  initialState,
  reducers: {
    getProductTypeById(state) {
      state.isLoading = true;
    },
    getProductTypeByIdSuccess(state, action) {
      state.productType = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getProductTypeByIdFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    getProductTypeByIdResetState(state) {
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
  getProductTypeById,
  getProductTypeByIdSuccess,
  getProductTypeByIdFailure,
  getProductTypeByIdResetState,
  internalServerFailure,
} = getProductTypeByIdSlice.actions;

export default getProductTypeByIdSlice.reducer;
