import { createSlice } from "@reduxjs/toolkit";
import { GetCommissionByIdState } from "../../Modal/GetCommissionById.modal";

const initialState = {
  commission: null,
  isLoading: false,
  isError: false,
  message: "",
} as GetCommissionByIdState;

const getCommissionByIdSlice = createSlice({
  name: "get_commission_by_id",
  initialState,
  reducers: {
    getCommissionById(state) {
      state.isLoading = true;
    },
    getCommissionByIdSuccess(state, action) {
      state.commission = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getCommissionByIdFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    getCommissionByIdResetState(state) {
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
  getCommissionById,
  getCommissionByIdSuccess,
  getCommissionByIdFailure,
  getCommissionByIdResetState,
  internalServerFailure,
} = getCommissionByIdSlice.actions;

export default getCommissionByIdSlice.reducer;
