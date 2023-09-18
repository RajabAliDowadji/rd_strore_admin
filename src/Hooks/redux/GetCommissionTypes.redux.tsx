import { createSlice } from "@reduxjs/toolkit";
import { GetCommissionTypesState } from "../../Modal/GetCommissionTypes.modal";

const initialState = {
  commissionTypes: [],
  isLoading: false,
  isError: false,
  message: "",
} as GetCommissionTypesState;

const getCommissionTypesSlice = createSlice({
  name: "get_commission_types",
  initialState,
  reducers: {
    getCommissionTypes(state) {
      state.isLoading = true;
    },
    getCommissionTypesSuccess(state, action) {
      state.commissionTypes = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getCommissionTypesFailure(state, action) {
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
  getCommissionTypes,
  getCommissionTypesSuccess,
  getCommissionTypesFailure,
  internalServerFailure,
} = getCommissionTypesSlice.actions;

export default getCommissionTypesSlice.reducer;
