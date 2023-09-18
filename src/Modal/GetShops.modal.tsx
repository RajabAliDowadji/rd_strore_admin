import { Place } from "./GetPlaces.modal";
import { ShopCategory } from "./GetShopCategories.modal";

export interface GetShopsState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  shops: Shop[];
}
export interface SuccessResponseState {
  status: number;
  message: string;
  data: Shop[];
  meta: any; //Work IN Future
}
export interface Shop {
  _id: string;
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
  place: Place;
  shop_category: ShopCategory;
  isActive: boolean;
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetShopColumns {
  _id: string;
  shop_name: string;
  owner_name: string;
  email: string;
  phone_number: string;
  isActive: boolean;
  isCompleted: boolean;
}
