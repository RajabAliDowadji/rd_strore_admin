import { CommissionType } from "./GetCommissionTypes.modal";
import { Product } from "./GetProducts.modal";

export interface GetCommissionsState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  commissions: Commission[];
}

export interface SuccessResponseState {
  status: number;
  message: string;
  data: Commission[];
  meta: any; //Work IN Future
}

export interface Commission {
  _id: string;
  commission: number;
  commission_type: CommissionType;
  product: Product;
  commission_price: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface GetCommission {
  _id: string;
  commission: number;
  commission_name: string;
  commission_sign: string;
  commission_price: string;
  product_title: string;
  product_price: number;
  createdAt?: string;
  updatedAt?: string;
}
