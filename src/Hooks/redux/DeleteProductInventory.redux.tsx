import { createSlice } from "@reduxjs/toolkit";
import { DeleteProductInventoryState } from "../../Modal/DeleteProductInventory.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
} as DeleteProductInventoryState;

const deleteProductInventorySlice = createSlice({
  name: "delete_product_inventory",
  initialState,
  reducers: {
    deleteProductInventory(state) {
      state.isLoading = true;
    },
    deleteProductInventorySuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload.message;
    },
    deleteProductInventoryFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    deleteProductInventoryResetState(state) {
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
  deleteProductInventory,
  deleteProductInventorySuccess,
  deleteProductInventoryFailure,
  deleteProductInventoryResetState,
  internalServerFailure,
} = deleteProductInventorySlice.actions;

export default deleteProductInventorySlice.reducer;
