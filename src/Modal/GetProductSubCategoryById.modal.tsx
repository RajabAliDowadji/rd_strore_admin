import { ProductCategory } from "./GetProductCategories.modal";

export interface GetProductSubCategoryByIdState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  productSubCategory: ProductSubCategory | null;
}
export interface SuccessResponseState {
  status: number;
  message: string;
  data: ProductSubCategory[];
  meta: any; //Work IN Future
}

export interface ProductSubCategory {
  _id: string;
  sub_category_name: string;
  search_name: string;
  product_category: ProductCategory;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetProductSubCategoryByIdPayload {
  id: string;
}
export interface GetProductSubCategoryByIdResponse {
  _id?: string;
  sub_category_name: string;
  product_category: string;
  search_name: string;
}
