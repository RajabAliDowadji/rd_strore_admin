import { Product } from "./GetProducts.modal";

export interface GetProductByIdState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  product: Product | null;
}
export interface SuccessResponseState {
  status: number;
  message: string;
  data: Product;
  meta: any; //Work IN Future
}
export interface GetProductByIdPayload {
  id: string;
}
export interface GetProductByIdResponse {
  _id?: string;
  category_name: string;
  search_name: string;
  product_type: string;
}
