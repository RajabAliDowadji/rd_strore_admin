import { createSlice } from "@reduxjs/toolkit";
import {
  CommissionType,
  GetCommissionTypesState,
} from "../../Modal/GetCommissionTypes.modal";

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
    removeCommissionTypeById(state, action) {
      state.commissionTypes = state.commissionTypes.filter(
        (commissionType: CommissionType) =>
          commissionType._id !== action.payload.id
      );
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
  removeCommissionTypeById,
  internalServerFailure,
} = getCommissionTypesSlice.actions;

export default getCommissionTypesSlice.reducer;
