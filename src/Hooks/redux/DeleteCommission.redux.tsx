import { createSlice } from "@reduxjs/toolkit";
import { DeleteCommissionState } from "../../Modal/DeleteCommission.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
} as DeleteCommissionState;

const deleteCommissionSlice = createSlice({
  name: "delete_commission",
  initialState,
  reducers: {
    deleteCommission(state) {
      state.isLoading = true;
    },
    deleteCommissionSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload.message;
    },
    deleteCommissionFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    deleteCommissionResetState(state) {
      state.isError = false;
      state.message = "";
      state.isLoading = false;
    },
    internalServerFailure(state) {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

export const {
  deleteCommission,
  deleteCommissionSuccess,
  deleteCommissionFailure,
  deleteCommissionResetState,
  internalServerFailure,
} = deleteCommissionSlice.actions;

export default deleteCommissionSlice.reducer;
