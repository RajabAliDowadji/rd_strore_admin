import { createSlice } from "@reduxjs/toolkit";
import { GetProductCategoryByIdState } from "../../Modal/GetProductCategoryById.modal";

const initialState = {
  productCategory: null,
  isLoading: false,
  isError: false,
  message: "",
} as GetProductCategoryByIdState;

const getProductCategoryByIdSlice = createSlice({
  name: "get_product_category_by_id",
  initialState,
  reducers: {
    getProductCategoryById(state) {
      state.isLoading = true;
    },
    getProductCategoryByIdSuccess(state, action) {
      state.productCategory = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getProductCategoryByIdFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    getProductCategoryByIdResetState(state) {
      state.productCategory = null;
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
  getProductCategoryById,
  getProductCategoryByIdSuccess,
  getProductCategoryByIdFailure,
  getProductCategoryByIdResetState,
  internalServerFailure,
} = getProductCategoryByIdSlice.actions;

export default getProductCategoryByIdSlice.reducer;
