import { createSlice } from "@reduxjs/toolkit";
import { GetPlaceState } from "../../Modal/GetPlace.modal";

const initialState = {
  place: [],
  isLoading: false,
  isError: false,
  isErrorMessage: "",
} as GetPlaceState;

const getPlaceSlice = createSlice({
  name: "get_place",
  initialState,
  reducers: {
    getPlace(state) {
      state.isLoading = true;
    },
    getPlaceSuccess(state, action) {
      state.place = action.payload.data.data;
      state.isLoading = false;
    },
    getPlaceFailure(state, action) {
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
  getPlace,
  getPlaceSuccess,
  getPlaceFailure,
  internalServerFailure,
} = getPlaceSlice.actions;

export default getPlaceSlice.reducer;
