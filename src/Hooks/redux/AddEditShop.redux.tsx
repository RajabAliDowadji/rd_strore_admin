import { createSlice } from "@reduxjs/toolkit";
import { AddEditShopState } from "../../Modal/AddEditShop.modal";

const initialState = {
  shop: null,
  isLoading: false,
  isError: false,
  message: "",
} as AddEditShopState;

const addEditShopSlice = createSlice({
  name: "add_edit_shop",
  initialState,
  reducers: {
    addEditShop(state) {
      state.isLoading = true;
    },
    addEditShopSuccess(state, action) {
      state.shop = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    addEditShopFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    addEditShopResetState(state) {
      state.shop = null;
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
  addEditShop,
  addEditShopSuccess,
  addEditShopFailure,
  addEditShopResetState,
  internalServerFailure,
} = addEditShopSlice.actions;

export default addEditShopSlice.reducer;
