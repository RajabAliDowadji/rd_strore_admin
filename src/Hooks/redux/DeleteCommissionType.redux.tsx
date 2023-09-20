import { createSlice } from "@reduxjs/toolkit";
import { DeleteCommissionTypeState } from "../../Modal/DeleteCommissionType.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
} as DeleteCommissionTypeState;

const deleteCommissionTypeSlice = createSlice({
  name: "delete_commission_type",
  initialState,
  reducers: {
    deleteCommissionType(state) {
      state.isLoading = true;
    },
    deleteCommissionTypeSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload.message;
    },
    deleteCommissionTypeFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    deleteCommissionTypeResetState(state) {
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
  deleteCommissionType,
  deleteCommissionTypeSuccess,
  deleteCommissionTypeFailure,
  deleteCommissionTypeResetState,
  internalServerFailure,
} = deleteCommissionTypeSlice.actions;

export default deleteCommissionTypeSlice.reducer;
