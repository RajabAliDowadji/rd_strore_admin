import { ProductCategory } from "./GetProductCategories.modal";

export interface AddEditProductCategoryState {
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

export interface AddProductCategoryPayload {
  category_name: string;
  search_name: string;
  product_type: string;
}

export interface EditProductCategoryPayload {
  id: string;
  values: AddProductCategoryPayload;
}
