export interface DeletePlaceState {
  isLoading: boolean;
  isError: boolean;
  isErrorMessage: string;
}
export interface SuccessResponseState {
  status: number;
  message: string;
  data: null;
  meta: any; //Work IN Future
}

export interface deletePlaceByIdPayload {
  id: string;
}
