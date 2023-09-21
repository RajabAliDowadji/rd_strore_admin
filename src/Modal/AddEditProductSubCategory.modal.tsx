import { ProductSubCategory } from "./GetProductSubCategories.modal";

export interface AddEditProductSubCategoryState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  productSubCategory: ProductSubCategory | null;
}

export interface SuccessResponseState {
  status: number;
  message: string;
  data: ProductSubCategory;
  meta: any; //Work IN Future
}

export interface AddProductSubCategoryPayload {
  sub_category_name: string;
  product_category: string;
  search_name: string;
}

export interface EditProductSubCategoryPayload {
  id: string;
  values: AddProductSubCategoryPayload;
}
