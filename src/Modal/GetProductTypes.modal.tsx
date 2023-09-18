export interface GetProductTypesState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  productTypes: ProductType[];
}
export interface SuccessResponseState {
  status: number;
  message: string;
  data: ProductType[];
  meta: any; //Work IN Future
}

export interface ProductType {
  _id: string;
  type_name: string;
  search_name: string;
  createdAt?: string;
  updatedAt?: string;
}
