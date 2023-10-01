import { createSlice } from "@reduxjs/toolkit";
import { GetProductByIdState } from "../../Modal/GetProductById.modal";

const initialState = {
  product: null,
  isLoading: false,
  isError: false,
  message: "",
} as GetProductByIdState;

const getProductByIdSlice = createSlice({
  name: "get_product_by_id",
  initialState,
  reducers: {
    getProductById(state) {
      state.isLoading = true;
    },
    getProductByIdSuccess(state, action) {
      state.product = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getProductByIdFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    getProductByIdResetState(state) {
      state.product = null;
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
  getProductById,
  getProductByIdSuccess,
  getProductByIdFailure,
  getProductByIdResetState,
  internalServerFailure,
} = getProductByIdSlice.actions;

export default getProductByIdSlice.reducer;
