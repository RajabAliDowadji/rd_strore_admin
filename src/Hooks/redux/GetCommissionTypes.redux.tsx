import { createSlice } from "@reduxjs/toolkit";
import { GetCommissionTypesState } from "../../Modal/CommissionTypes.modal";

const initialState = {
  commissionTypes: [],
  isLoading: false,
  isError: false,
  isErrorMessage: "",
} as GetCommissionTypesState;

const getCommissionTypesSlice = createSlice({
  name: "get_commission_types",
  initialState,
  reducers: {
    getCommissionTypes(state) {
      state.isLoading = true;
    },
    getCommissionTypesSuccess(state, action) {
      state.commissionTypes = action.payload.data.data;
      state.isLoading = false;
    },
    getCommissionTypesFailure(state, action) {
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
  getCommissionTypes,
  getCommissionTypesSuccess,
  getCommissionTypesFailure,
  internalServerFailure,
} = getCommissionTypesSlice.actions;

export default getCommissionTypesSlice.reducer;
