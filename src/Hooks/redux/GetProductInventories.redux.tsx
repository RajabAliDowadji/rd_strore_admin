import { createSlice } from "@reduxjs/toolkit";
import {
  GetProductInventoriesState,
  ProductInventory,
} from "../../Modal/GetProductInventories.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
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
      state.productInventories = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getProductInventoriesFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    removeProductInventoryById(state, action) {
      state.productInventories = state.productInventories.filter(
        (productInventory: ProductInventory) =>
          productInventory._id !== action.payload.id
      );
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
  removeProductInventoryById,
  internalServerFailure,
} = getProductInventoriesSlice.actions;

export default getProductInventoriesSlice.reducer;
