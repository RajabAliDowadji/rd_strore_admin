import { createSlice } from "@reduxjs/toolkit";
import { GetPlaceState } from "../../Modal/GetPlace.modal";

const initialState = {
  place: [],
  isLoading: false,
  isError: false,
  message: "",
} as GetPlaceState;

const getPlaceSlice = createSlice({
  name: "get_place",
  initialState,
  reducers: {
    getPlace(state) {
      state.isLoading = true;
    },
    getPlaceSuccess(state, action) {
      state.place = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getPlaceFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    getPlaceResetState(state) {
      state.place = [];
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
  getPlace,
  getPlaceSuccess,
  getPlaceFailure,
  getPlaceResetState,
  internalServerFailure,
} = getPlaceSlice.actions;

export default getPlaceSlice.reducer;
