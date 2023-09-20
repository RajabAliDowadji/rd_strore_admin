import { createSlice } from "@reduxjs/toolkit";
import { GetCommissionTypeByIdState } from "../../Modal/GetCommissionTypeById.modal";

const initialState = {
  commissionType: null,
  isLoading: false,
  isError: false,
  message: "",
} as GetCommissionTypeByIdState;

const getCommissionTypeByIdSlice = createSlice({
  name: "get_commission_type_by_id",
  initialState,
  reducers: {
    getCommissionTypeById(state) {
      state.isLoading = true;
    },
    getCommissionTypeByIdSuccess(state, action) {
      state.commissionType = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getCommissionTypeByIdFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    getCommissionTypeByIdResetState(state) {
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
  getCommissionTypeById,
  getCommissionTypeByIdSuccess,
  getCommissionTypeByIdFailure,
  getCommissionTypeByIdResetState,
  internalServerFailure,
} = getCommissionTypeByIdSlice.actions;

export default getCommissionTypeByIdSlice.reducer;
