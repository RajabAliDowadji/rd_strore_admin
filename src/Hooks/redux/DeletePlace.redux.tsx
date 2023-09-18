import { createSlice } from "@reduxjs/toolkit";
import { DeletePlaceState } from "../../Modal/DeletePlace.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
} as DeletePlaceState;

const deletePlaceSlice = createSlice({
  name: "delete_place",
  initialState,
  reducers: {
    deletePlace(state) {
      state.isLoading = true;
    },
    deletePlaceSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload.message;
    },
    deletePlaceFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    deletePlaceResetState(state) {
      state.isError = false;
      state.message = "";
      state.isLoading = false;
    },
    internalServerFailure(state) {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

export const {
  deletePlace,
  deletePlaceSuccess,
  deletePlaceFailure,
  deletePlaceResetState,
  internalServerFailure,
} = deletePlaceSlice.actions;

export default deletePlaceSlice.reducer;
