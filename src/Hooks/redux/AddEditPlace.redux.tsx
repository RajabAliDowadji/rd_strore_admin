import { createSlice } from "@reduxjs/toolkit";
import { AddEditPlacesState } from "../../Modal/AddEditPlace.modal";

const initialState = {
  place: null,
  isLoading: false,
  isError: false,
  isErrorMessage: "",
} as AddEditPlacesState;

const addEditPlaceSlice = createSlice({
  name: "add_edit_place",
  initialState,
  reducers: {
    addEditPlace(state) {
      state.isLoading = true;
    },
    addEditPlaceSuccess(state, action) {
      state.place = action.payload.data.data;
      state.isLoading = false;
    },
    addEditPlaceFailure(state, action) {
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
  addEditPlace,
  addEditPlaceSuccess,
  addEditPlaceFailure,
  internalServerFailure,
} = addEditPlaceSlice.actions;

export default addEditPlaceSlice.reducer;
