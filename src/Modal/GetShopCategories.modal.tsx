export interface GetShopCategoriesState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  shopCategories: ShopCategory[];
}
export interface SuccessResponseState {
  status: number;
  message: string;
  data: ShopCategory[];
  meta: any; //Work IN Future
}

export interface ShopCategory {
  _id: string;
  category_name: string;
  lower_range: number;
  upper_range: number;
  createdAt?: string;
  updatedAt?: string;
}
