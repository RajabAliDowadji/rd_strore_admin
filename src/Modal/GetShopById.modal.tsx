import { Place } from "./GetPlaces.modal";
import { ShopCategory } from "./GetShopCategories.modal";
import { Shop } from "./GetShops.modal";

export interface GetShopByIdState {
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
export interface GetShopByIdPayload {
  id: string;
}
export interface GetShopByIdResponse {
  _id?: string;
  shop_name: string;
  owner_name: string;
  email: string;
  phone_number: string;
  optional_number: string;
  aadhar_number: string;
  second_owner_name: string;
  second_owner_number: string;
  owner_image: string;
  owner_aadhar_card: string;
  shop_image: string;
  address: string;
  place: string;
  shop_category: string;
  isActive?: boolean;
  isCompleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetShopSuccessByIdResponse {
  _id?: string;
  shop_name: string;
  owner_name: string;
  email: string;
  phone_number: string;
  optional_number: string;
  aadhar_number: string;
  second_owner_name: string;
  second_owner_number: string;
  owner_image: FileResponse;
  owner_aadhar_card: FileResponse;
  shop_image: FileResponse;
  address: string;
  place: Place;
  shop_category: ShopCategory;
  isActive: boolean;
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FileResponse {
  _id: string;
  file_name: string;
  file_size: number;
  file_key: string;
  file_url: string;
  createdAt: string;
  updatedAt: string;
}
