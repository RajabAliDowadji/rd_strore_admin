import { createSlice } from "@reduxjs/toolkit";
import { GetPlacesState } from "../../Modal/GetPlaces.modal";

const initialState = {
  places: [],
  isLoading: false,
  isError: false,
  isErrorMessage: "",
} as GetPlacesState;

const getPlacesSlice = createSlice({
  name: "get_places",
  initialState,
  reducers: {
    getPlaces(state) {
      state.isLoading = true;
    },
    getPlacesSuccess(state, action) {
      state.places = action.payload.data.data;
      state.isLoading = false;
    },
    getPlacesFailure(state, action) {
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
  getPlaces,
  getPlacesSuccess,
  getPlacesFailure,
  internalServerFailure,
} = getPlacesSlice.actions;

export default getPlacesSlice.reducer;
