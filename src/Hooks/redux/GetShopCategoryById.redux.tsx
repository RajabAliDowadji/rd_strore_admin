import { createSlice } from "@reduxjs/toolkit";
import { GetShopCategoryByIdState } from "../../Modal/GetShopCategoryById.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
  shopCategory: null,
} as GetShopCategoryByIdState;

const getShopCategoryByIdSlice = createSlice({
  name: "get_shop_category_by_id",
  initialState,
  reducers: {
    getShopCategoryById(state) {
      state.isLoading = true;
    },
    getShopCategoryByIdSuccess(state, action) {
      state.shopCategory = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getShopCategoryByIdFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    getShopCategoryByIdResetState(state) {
      state.shopCategory = null;
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
  getShopCategoryById,
  getShopCategoryByIdSuccess,
  getShopCategoryByIdFailure,
  getShopCategoryByIdResetState,
  internalServerFailure,
} = getShopCategoryByIdSlice.actions;

export default getShopCategoryByIdSlice.reducer;
