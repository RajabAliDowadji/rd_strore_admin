import { createSlice } from "@reduxjs/toolkit";
import { GetProductRatingsState } from "../../Modal/GetProductRatings.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
  productRatings: [],
} as GetProductRatingsState;

const getProductRatingsSlice = createSlice({
  name: "get_product_ratings",
  initialState,
  reducers: {
    getProductRatings(state) {
      state.isLoading = true;
    },
    getProductRatingsSuccess(state, action) {
      state.productRatings = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getProductRatingsFailure(state, action) {
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
  getProductRatings,
  getProductRatingsSuccess,
  getProductRatingsFailure,
  internalServerFailure,
} = getProductRatingsSlice.actions;

export default getProductRatingsSlice.reducer;
