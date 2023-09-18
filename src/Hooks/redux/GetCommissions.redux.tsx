import { createSlice } from "@reduxjs/toolkit";
import { GetCommissionsState } from "../../Modal/GetCommissions.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
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
      state.commissions = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getCommissionsFailure(state, action) {
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
  getCommissions,
  getCommissionsSuccess,
  getCommissionsFailure,
  internalServerFailure,
} = getCommissionsSlice.actions;

export default getCommissionsSlice.reducer;
