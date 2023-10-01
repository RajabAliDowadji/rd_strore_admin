import { createSlice } from "@reduxjs/toolkit";
import { AddEditFilesState } from "../../Modal/AddEditFiles.modal";

const initialState = {
  files: [],
  isLoading: false,
  isError: false,
  message: "",
} as AddEditFilesState;

const addEditFilesSlice = createSlice({
  name: "add_edit_files",
  initialState,
  reducers: {
    addEditFiles(state) {
      state.isLoading = true;
    },
    addEditFilesSuccess(state, action) {
      state.files = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    addEditFilesFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    addEditFilesResetState(state) {
      state.files = [];
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
  addEditFiles,
  addEditFilesSuccess,
  addEditFilesFailure,
  addEditFilesResetState,
  internalServerFailure,
} = addEditFilesSlice.actions;

export default addEditFilesSlice.reducer;
