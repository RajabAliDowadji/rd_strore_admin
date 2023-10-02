import { createSlice } from "@reduxjs/toolkit";
import { AddEditCommissionState } from "../../Modal/AddEditCommission.modal";

const initialState = {
  commission: null,
  isLoading: false,
  isError: false,
  message: "",
} as AddEditCommissionState;

const addEditCommissionSlice = createSlice({
  name: "add_edit_commission",
  initialState,
  reducers: {
    addEditCommission(state) {
      state.isLoading = true;
    },
    addEditCommissionSuccess(state, action) {
      state.commission = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    addEditCommissionFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    addEditCommissionResetState(state) {
      state.commission = null;
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
  addEditCommission,
  addEditCommissionSuccess,
  addEditCommissionFailure,
  addEditCommissionResetState,
  internalServerFailure,
} = addEditCommissionSlice.actions;

export default addEditCommissionSlice.reducer;
