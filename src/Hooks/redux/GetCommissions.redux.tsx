import { createSlice } from "@reduxjs/toolkit";
import { GetCommissionsState } from "../../Modal/GetCommissions.modal";

const initialState = {
  isLoading: false,
  isError: false,
  isErrorMessage: "",
  commissions: [],
} as GetCommissionsState;

const getCommissionsSlice = createSlice({
  name: "get_commissions",
  initialState,
  reducers: {
    getCommissions(state) {
      state.isLoading = true;
    },
    getCommissionsSuccess(state, action) {
      state.commissions = action.payload.data.data;
      state.isLoading = false;
    },
    getCommissionsFailure(state, action) {
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
  getCommissions,
  getCommissionsSuccess,
  getCommissionsFailure,
  internalServerFailure,
} = getCommissionsSlice.actions;

export default getCommissionsSlice.reducer;
