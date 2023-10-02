import { createSlice } from "@reduxjs/toolkit";
import { GetProductInventoryByIdState } from "../../Modal/GetProductInventoryById.modal";

const initialState = {
  productInventory: null,
  isLoading: false,
  isError: false,
  message: "",
} as GetProductInventoryByIdState;

const getProductInventoryByIdSlice = createSlice({
  name: "get_product_inventory_by_id",
  initialState,
  reducers: {
    getProductInventoryById(state) {
      state.isLoading = true;
    },
    getProductInventoryByIdSuccess(state, action) {
      state.productInventory = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getProductInventoryByIdFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    getProductInventoryByIdResetState(state) {
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
  getProductInventoryById,
  getProductInventoryByIdSuccess,
  getProductInventoryByIdFailure,
  getProductInventoryByIdResetState,
  internalServerFailure,
} = getProductInventoryByIdSlice.actions;

export default getProductInventoryByIdSlice.reducer;
