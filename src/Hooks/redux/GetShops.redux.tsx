import { createSlice } from "@reduxjs/toolkit";
import { GetShopsState, Shop } from "../../Modal/GetShops.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
  shops: [],
} as GetShopsState;

const getShopsSlice = createSlice({
  name: "get_shops",
  initialState,
  reducers: {
    getShops(state) {
      state.isLoading = true;
    },
    getShopsSuccess(state, action) {
      state.shops = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getShopsFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    removeShopById(state, action) {
      state.shops = state.shops.filter(
        (shop: Shop) => shop._id !== action.payload.id
      );
    },
    internalServerFailure(state) {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

export const {
  getShops,
  getShopsSuccess,
  getShopsFailure,
  removeShopById,
  internalServerFailure,
} = getShopsSlice.actions;

export default getShopsSlice.reducer;
