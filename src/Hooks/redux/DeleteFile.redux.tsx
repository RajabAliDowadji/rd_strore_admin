import { createSlice } from "@reduxjs/toolkit";
import { DeleteFileState } from "../../Modal/DeleteFile.modal";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
} as DeleteFileState;

const deleteFileSlice = createSlice({
  name: "delete_file",
  initialState,
  reducers: {
    deleteFile(state) {
      state.isLoading = true;
    },
    deleteFileSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.message = action.payload.message;
    },
    deleteFileFailure(state, action) {
      state.isError = true;
      state.message = action.payload.error.message;
      state.isLoading = false;
    },
    deleteFileResetState(state) {
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
  deleteFile,
  deleteFileSuccess,
  deleteFileFailure,
  deleteFileResetState,
  internalServerFailure,
} = deleteFileSlice.actions;

export default deleteFileSlice.reducer;
