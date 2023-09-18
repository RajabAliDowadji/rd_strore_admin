import { createSlice } from "@reduxjs/toolkit";
import { GetPlacesState, Place } from "../../Modal/GetPlaces.modal";

const initialState = {
  places: [],
  isLoading: false,
  isError: false,
  message: "",
} as GetPlacesState;

const getPlacesSlice = createSlice({
  name: "get_places",
  initialState,
  reducers: {
    getPlaces(state) {
      state.isLoading = true;
    },
    getPlacesSuccess(state, action) {
      state.places = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getPlacesFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    removePlaceById(state, action) {
      state.places = state.places.filter(
        (place: Place) => place._id !== action.payload.id
      );
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
  removePlaceById,
  internalServerFailure,
} = getPlacesSlice.actions;

export default getPlacesSlice.reducer;
