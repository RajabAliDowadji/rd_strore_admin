import { createSlice } from "@reduxjs/toolkit";
import { DeleteShopCategoryState } from "../../Modal/DeleteShopCategory.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
} as DeleteShopCategoryState;

const deleteShopCategorySlice = createSlice({
  name: "delete_shop_category",
  initialState,
  reducers: {
    deleteShopCategory(state) {
      state.isLoading = true;
    },
    deleteShopCategorySuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload.message;
    },
    deleteShopCategoryFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    deleteShopCategoryResetState(state) {
      state.isError = false;
      state.message = "";
      state.isLoading = false;
    },
    internalServerFailure(state) {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

export const {
  deleteShopCategory,
  deleteShopCategorySuccess,
  deleteShopCategoryFailure,
  deleteShopCategoryResetState,
  internalServerFailure,
} = deleteShopCategorySlice.actions;

export default deleteShopCategorySlice.reducer;
