import { ProductType } from "./GetProductTypes.modal";

export interface AddEditProductTypeState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  productType: ProductType | null;
}

export interface SuccessResponseState {
  status: number;
  message: string;
  data: ProductType;
  meta: any; //Work IN Future
}

export interface AddProductTypePayload {
  type_name: string;
  search_name: string;
}

export interface EditProductTypePayload {
  id: string;
  values: AddProductTypePayload;
}
