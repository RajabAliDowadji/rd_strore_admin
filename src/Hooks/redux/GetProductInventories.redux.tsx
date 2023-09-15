import { createSlice } from "@reduxjs/toolkit";
import { GetProductInventoriesState } from "../../Modal/GetProductInventories.modal";

const initialState = {
  isLoading: false,
  isError: false,
  isErrorMessage: "",
  productInventories: [],
} as GetProductInventoriesState;

const getProductInventoriesSlice = createSlice({
  name: "get_product_inventories",
  initialState,
  reducers: {
    getProductInventories(state) {
      state.isLoading = true;
    },
    getProductInventoriesSuccess(state, action) {
      state.productInventories = action.payload.data.data;
      state.isLoading = false;
    },
    getProductInventoriesFailure(state, action) {
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
  getProductInventories,
  getProductInventoriesSuccess,
  getProductInventoriesFailure,
  internalServerFailure,
} = getProductInventoriesSlice.actions;

export default getProductInventoriesSlice.reducer;
