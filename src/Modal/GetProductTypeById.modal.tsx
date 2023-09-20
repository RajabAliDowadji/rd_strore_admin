import { ProductType } from "./GetProductCategories.modal";

export interface GetProductTypeByIdState {
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
export interface GetProductTypeByIdPayload {
  id: string;
}
export interface GetProductTypeByIdResponse {
  _id?: string;
  type_name: string;
  search_name: string;
}
