import { createSlice } from "@reduxjs/toolkit";
import { AddEditShopCategoryState } from "../../Modal/AddEditShopCategory.modal";

const initialState = {
  shopCategory: null,
  isLoading: false,
  isError: false,
  message: "",
} as AddEditShopCategoryState;

const addEditShopCategorySlice = createSlice({
  name: "add_edit_shop_category",
  initialState,
  reducers: {
    addEditShopCategory(state) {
      state.isLoading = true;
    },
    addEditShopCategorySuccess(state, action) {
      state.shopCategory = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    addEditShopCategoryFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    addEditShopCategoryResetState(state) {
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
  addEditShopCategory,
  addEditShopCategorySuccess,
  addEditShopCategoryFailure,
  addEditShopCategoryResetState,
  internalServerFailure,
} = addEditShopCategorySlice.actions;

export default addEditShopCategorySlice.reducer;
