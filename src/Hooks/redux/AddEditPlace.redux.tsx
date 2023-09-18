import { createSlice } from "@reduxjs/toolkit";
import { AddEditPlacesState } from "../../Modal/AddEditPlace.modal";

const initialState = {
  place: null,
  isLoading: false,
  isError: false,
  message: "",
} as AddEditPlacesState;

const addEditPlaceSlice = createSlice({
  name: "add_edit_place",
  initialState,
  reducers: {
    addEditPlace(state) {
      state.isLoading = true;
    },
    addEditPlaceSuccess(state, action) {
      state.place = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    addEditPlaceFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    addEditPlaceResetState(state) {
      state.place = null;
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
  addEditPlace,
  addEditPlaceSuccess,
  addEditPlaceFailure,
  addEditPlaceResetState,
  internalServerFailure,
} = addEditPlaceSlice.actions;

export default addEditPlaceSlice.reducer;
