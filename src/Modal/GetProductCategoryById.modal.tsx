import { ProductCategory } from "./GetProductCategories.modal";

export interface GetProductCategoryByIdState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  productCategory: ProductCategory | null;
}
export interface SuccessResponseState {
  status: number;
  message: string;
  data: ProductCategory;
  meta: any; //Work IN Future
}
export interface GetProductCategoryByIdPayload {
  id: string;
}
export interface GetProductCategoryByIdResponse {
  _id: string;
  category_name: string;
  category_image: string;
}
export interface dropDown {
  label: string;
  value: string | number;
}
