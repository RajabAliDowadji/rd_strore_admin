import { Shop } from "./GetShops.modal";

export interface AddEditShopBasicDetailsState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  shop: Shop | null;
}

export interface SuccessResponseState {
  status: number;
  message: string;
  data: Shop;
  meta: any; //Work IN Future
}

export interface AddShopBasicDetailsPayload {
  shop_name: string;
  owner_name: string;
  email: string;
  phone_number: string;
  optional_number: string;
  aadhar_number: string;
  second_owner_name: string;
  second_owner_number: string;
  address: string;
  place: string;
  shop_category: string;
}

export interface EditShopBasicDetailsPayload {
  id: string;
  values: AddShopBasicDetailsPayload;
}
