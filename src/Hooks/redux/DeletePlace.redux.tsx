import { createSlice } from "@reduxjs/toolkit";
import { DeletePlaceState } from "../../Modal/DeletePlace.modal";

const initialState = {
  isLoading: false,
  isError: false,
  isErrorMessage: "",
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
    },
    deletePlaceFailure(state, action) {
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
  deletePlace,
  deletePlaceSuccess,
  deletePlaceFailure,
  internalServerFailure,
} = deletePlaceSlice.actions;

export default deletePlaceSlice.reducer;
