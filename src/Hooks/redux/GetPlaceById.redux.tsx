import { createSlice } from "@reduxjs/toolkit";
import { GetPlaceByIdState } from "../../Modal/GetPlaceById.modal";

const initialState = {
  place: null,
  isLoading: false,
  isError: false,
  isErrorMessage: "",
} as GetPlaceByIdState;

const getPlaceByIdSlice = createSlice({
  name: "get_place_by_id",
  initialState,
  reducers: {
    getPlaceById(state) {
      state.isLoading = true;
    },
    getPlaceByIdSuccess(state, action) {
      state.place = action.payload.data.data;
      state.isLoading = false;
    },
    getPlaceByIdFailure(state, action) {
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
  getPlaceById,
  getPlaceByIdSuccess,
  getPlaceByIdFailure,
  internalServerFailure,
} = getPlaceByIdSlice.actions;

export default getPlaceByIdSlice.reducer;
