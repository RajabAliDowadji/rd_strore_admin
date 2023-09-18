import { createSlice } from "@reduxjs/toolkit";
import { GetPlaceByIdState } from "../../Modal/GetPlaceById.modal";

const initialState = {
  place: null,
  isLoading: false,
  isError: false,
  message: "",
} as GetPlaceByIdState;

const getPlaceByIdSlice = createSlice({
  name: "get_place_by_id",
  initialState,
  reducers: {
    getPlaceById(state) {
      state.isLoading = true;
    },
    getPlaceByIdSuccess(state, action) {
      state.place = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    getPlaceByIdFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    getPlaceByIdResetState(state) {
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
  getPlaceById,
  getPlaceByIdSuccess,
  getPlaceByIdFailure,
  getPlaceByIdResetState,
  internalServerFailure,
} = getPlaceByIdSlice.actions;

export default getPlaceByIdSlice.reducer;
