export interface GetPlacesState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  places: Place[];
}
export interface SuccessResponseState {
  status: number;
  message: string;
  data: Place[];
  meta: any; //Work IN Future
}

export interface Place {
  _id: string;
  town: string;
  district: string;
  city: string;
  state: string;
  pincode: number;
  createdAt?: string;
  updatedAt?: string;
}
