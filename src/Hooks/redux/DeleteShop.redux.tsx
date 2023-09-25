import { createSlice } from "@reduxjs/toolkit";
import { DeleteShopState } from "../../Modal/DeleteShop.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
} as DeleteShopState;

const deleteShopSlice = createSlice({
  name: "delete_shop",
  initialState,
  reducers: {
    deleteShop(state) {
      state.isLoading = true;
    },
    deleteShopSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload.message;
    },
    deleteShopFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    deleteShopResetState(state) {
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
  deleteShop,
  deleteShopSuccess,
  deleteShopFailure,
  deleteShopResetState,
  internalServerFailure,
} = deleteShopSlice.actions;

export default deleteShopSlice.reducer;
