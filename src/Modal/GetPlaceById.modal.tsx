import { Place } from "./GetPlaces.modal";

export interface GetPlaceByIdState {
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
export interface GetPlaceByIdPayload {
  id: string;
}
export interface GetPlaceByIdResponse {
  pincode: string;
  town: string;
  district: string;
  city: string;
  state: string;
}
