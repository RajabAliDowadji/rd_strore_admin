export interface GetProductCategoriesState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  productCategories: ProductCategory[];
}
export interface SuccessResponseState {
  status: number;
  message: string;
  data: ProductCategory[];
  meta: any; //Work IN Future
}

export interface ProductCategory {
  _id: string;
  category_name: string;
  search_name: string;
  product_type: ProductType;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductType {
  _id: string;
  type_name: string;
  search_name: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface GetProductCategoriesColumns {
  _id: string;
  category_name: string;
  type_name?: string;
  search_name: string;
  product_type?: string;
}
