import { ShopCategory } from "./GetShopCategories.modal";

export interface AddEditShopCategoryState {
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

export interface AddShopCategoryPayload {
  category_name: string;
  lower_range: number;
  upper_range: number;
}
export interface EditShopCategoryPayload {
  id: string;
  values: AddShopCategoryPayload;
}
