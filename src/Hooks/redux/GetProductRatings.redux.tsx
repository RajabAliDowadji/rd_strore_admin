import { createSlice } from "@reduxjs/toolkit";
import { GetProductRatingsState } from "../../Modal/GetProductRatings.modal";

const initialState = {
  isLoading: false,
  isError: false,
  isErrorMessage: "",
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
      state.productRatings = action.payload.data.data;
      state.isLoading = false;
    },
    getProductRatingsFailure(state, action) {
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
  getProductRatings,
  getProductRatingsSuccess,
  getProductRatingsFailure,
  internalServerFailure,
} = getProductRatingsSlice.actions;

export default getProductRatingsSlice.reducer;
