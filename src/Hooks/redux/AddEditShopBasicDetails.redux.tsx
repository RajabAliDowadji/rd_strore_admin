import { createSlice } from "@reduxjs/toolkit";
import { AddEditShopBasicDetailsState } from "../../Modal/AddEditShopBasicDetails.modal";

const initialState = {
  shop: null,
  isLoading: false,
  isError: false,
  message: "",
} as AddEditShopBasicDetailsState;

const addEditShopBasicDetailsSlice = createSlice({
  name: "add_edit_shop_basic_details",
  initialState,
  reducers: {
    addEditShopBasicDetails(state) {
      state.isLoading = true;
    },
    addEditShopBasicDetailsSuccess(state, action) {
      state.shop = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    addEditShopBasicDetailsFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    addEditShopBasicDetailsResetState(state) {
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
  addEditShopBasicDetails,
  addEditShopBasicDetailsSuccess,
  addEditShopBasicDetailsFailure,
  addEditShopBasicDetailsResetState,
  internalServerFailure,
} = addEditShopBasicDetailsSlice.actions;

export default addEditShopBasicDetailsSlice.reducer;
