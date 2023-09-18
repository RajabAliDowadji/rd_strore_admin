import { ProductCategory } from "./GetProductCategories.modal";

export interface GetProductSubCategoriesState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  productSubCategories: ProductSubCategory[];
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

export interface GetProductSubCategoriesColumns {
  _id: string;
  sub_category_name: string;
  category_name: string;
  search_name: string;
}
