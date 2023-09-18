import { Place } from "./GetPlaces.modal";

export interface AddEditPlacesState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  place: Place | null;
}

export interface SuccessResponseState {
  status: number;
  message: string;
  data: Place;
  meta: any; //Work IN Future
}

export interface AddPlacePayload {
  pincode: number;
}
export interface EditPlacePayload {
  id: string;
  values: AddPlacePayload;
}
