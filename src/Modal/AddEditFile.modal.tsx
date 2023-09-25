export interface AddEditFileState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  file: DataFile | null;
}

export interface SuccessResponseState {
  status: number;
  message: string;
  data: DataFile;
  meta: any; //Work IN Future
}

export interface DataFile {
  file_name: string;
  file_size: string;
  file_key: string;
  file_url: string;
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddFilePayload {
  values: any;
}
export interface EditFilePayload {
  id: string;
  values: any;
}
