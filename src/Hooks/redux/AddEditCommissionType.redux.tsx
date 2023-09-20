import { createSlice } from "@reduxjs/toolkit";
import { AddEditCommissionTypeState } from "../../Modal/AddEditCommissionType.modal";

const initialState = {
  commissionType: null,
  isLoading: false,
  isError: false,
  message: "",
} as AddEditCommissionTypeState;

const addEditCommissionTypeSlice = createSlice({
  name: "add_edit_commission_type",
  initialState,
  reducers: {
    addEditCommissionType(state) {
      state.isLoading = true;
    },
    addEditCommissionTypeSuccess(state, action) {
      state.commissionType = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    addEditCommissionTypeFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    addEditCommissionTypeResetState(state) {
      state.commissionType = null;
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
  addEditCommissionType,
  addEditCommissionTypeSuccess,
  addEditCommissionTypeFailure,
  addEditCommissionTypeResetState,
  internalServerFailure,
} = addEditCommissionTypeSlice.actions;

export default addEditCommissionTypeSlice.reducer;
