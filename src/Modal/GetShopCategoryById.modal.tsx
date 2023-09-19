import { ShopCategory } from "./GetShopCategories.modal";

export interface GetShopCategoryByIdState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  shopCategory: ShopCategory | null;
}
export interface SuccessResponseState {
  status: number;
  message: string;
  data: ShopCategory;
  meta: any; //Work IN Future
}
export interface GetShopCategoryByIdPayload {
  id: string;
}

export interface GetShopCategoryByIdResponse {
  _id?: string;
  category_name: string;
  lower_range: number;
  upper_range: number;
}
