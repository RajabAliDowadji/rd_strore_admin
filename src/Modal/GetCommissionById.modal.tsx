import { Commission } from "./GetCommissions.modal";

export interface GetCommissionByIdState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  commission: Commission | null;
}
export interface SuccessResponseState {
  status: number;
  message: string;
  data: Commission;
  meta: any; //Work IN Future
}
export interface GetCommissionByIdPayload {
  id: string;
}
export interface GetCommissionByIdResponse {
  _id?: string;
  commission_type: string;
  commission: string;
  product: string;
}
export interface GetCommissionByIdViewResponse {
  _id: string;
  commission_name: string;
  commission_sign: string;
  commission: string;
  product_title: string;
  product_MRP_price: string;
  product_price: string;
  commission_price: string;
}
