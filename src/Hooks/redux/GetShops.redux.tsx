import { createSlice } from "@reduxjs/toolkit";
import { GetShopsState } from "../../Modal/GetShops.modal";

const initialState = {
  isLoading: false,
  isError: false,
  isErrorMessage: "",
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
      state.shops = action.payload.data.data;
      state.isLoading = false;
    },
    getShopsFailure(state, action) {
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
  getShops,
  getShopsSuccess,
  getShopsFailure,
  internalServerFailure,
} = getShopsSlice.actions;

export default getShopsSlice.reducer;
