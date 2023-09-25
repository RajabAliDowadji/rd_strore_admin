import { createSlice } from "@reduxjs/toolkit";
import { AddEditFileState } from "../../Modal/AddEditFile.modal";

const initialState = {
  file: null,
  isLoading: false,
  isError: false,
  message: "",
} as AddEditFileState;

const addEditFileSlice = createSlice({
  name: "add_edit_file",
  initialState,
  reducers: {
    addEditFile(state) {
      state.isLoading = true;
    },
    addEditFileSuccess(state, action) {
      state.file = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.isError = false;
    },
    addEditFileFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    addEditFileResetState(state) {
      state.file = null;
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
  addEditFile,
  addEditFileSuccess,
  addEditFileFailure,
  addEditFileResetState,
  internalServerFailure,
} = addEditFileSlice.actions;

export default addEditFileSlice.reducer;
