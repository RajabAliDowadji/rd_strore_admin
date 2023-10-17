import { Shop } from "./GetShops.modal";

export interface GetAdminCommissionState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  admin_commissions: AdminCommission[];
}

export interface SuccessResponseState {
  status: number;
  message: string;
  data: AdminCommission[];
  meta: any; //Work IN Future
}

export interface AdminCommission {
  _id: string;
  shop_id: Shop;
  orders_count: number;
  total_payments: number;
  total_commissions: number;
  createdAt?: string;
  updatedAt?: string;
}
export interface AdminCommissionResponse {
  _id: string;
  shop_name: string;
  owner_name: string;
  orders_count: number;
  total_payments: number;
  total_commissions: number;
}
