import { createSlice } from "@reduxjs/toolkit";
import { AddEditProductInventoryState } from "../../Modal/AddEditProductInventory.modal";

const initialState = {
  productInventory: null,
  isLoading: false,
  isError: false,
  message: "",
} as AddEditProductInventoryState;

const addEditProductInventorySlice = createSlice({
  name: "add_edit_product_inventory",
  initialState,
  reducers: {
    addEditProductInventory(state) {
      state.isLoading = true;
    },
    addEditProductInventorySuccess(state, action) {
      state.productInventory = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    addEditProductInventoryFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    addEditProductInventoryResetState(state) {
      state.productInventory = null;
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
  addEditProductInventory,
  addEditProductInventorySuccess,
  addEditProductInventoryFailure,
  addEditProductInventoryResetState,
  internalServerFailure,
} = addEditProductInventorySlice.actions;

export default addEditProductInventorySlice.reducer;
