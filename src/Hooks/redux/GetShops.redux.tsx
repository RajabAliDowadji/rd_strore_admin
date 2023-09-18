import { createSlice } from "@reduxjs/toolkit";
import { GetShopsState } from "../../Modal/GetShops.modal";

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
  internalServerFailure,
} = getShopsSlice.actions;

export default getShopsSlice.reducer;
