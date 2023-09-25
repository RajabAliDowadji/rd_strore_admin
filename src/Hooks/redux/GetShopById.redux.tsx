import { createSlice } from "@reduxjs/toolkit";
import { GetShopByIdState } from "../../Modal/GetShopById.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
  shop: null,
} as GetShopByIdState;

const getShopByIdSlice = createSlice({
  name: "get_shop_by_id",
  initialState,
  reducers: {
    getShopById(state) {
      state.isLoading = true;
    },
    getShopByIdSuccess(state, action) {
      state.shop = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getShopByIdFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    getShopByIdResetState(state) {
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
  getShopById,
  getShopByIdSuccess,
  getShopByIdFailure,
  getShopByIdResetState,
  internalServerFailure,
} = getShopByIdSlice.actions;

export default getShopByIdSlice.reducer;
