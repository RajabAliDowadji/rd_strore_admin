import { createSlice } from "@reduxjs/toolkit";
import { GetAdminCommissionState } from "../../Modal/GetAdminCommission.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
  admin_commissions: [],
} as GetAdminCommissionState;

const getAdminCommissionSlice = createSlice({
  name: "get_admin_commisions",
  initialState,
  reducers: {
    getAdminCommission(state) {
      state.isLoading = true;
    },
    getAdminCommissionSuccess(state, action) {
      state.admin_commissions = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getAdminCommissionFailure(state, action) {
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
  getAdminCommission,
  getAdminCommissionSuccess,
  getAdminCommissionFailure,
  internalServerFailure,
} = getAdminCommissionSlice.actions;

export default getAdminCommissionSlice.reducer;
