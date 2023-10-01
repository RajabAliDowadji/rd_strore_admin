import { DataFile } from "./AddEditFile.modal";

export interface AddEditFilesState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  files: DataFile[];
}

export interface SuccessResponseState {
  status: number;
  message: string;
  data: DataFile[];
  meta: any; //Work IN Future
}

export interface AddFilesPayload {
  values: any;
}
export interface EditFilesPayload {
  id: string;
  values: any;
}
