import { Commission } from "./GetCommissions.modal";

export interface AddEditCommissionState {
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

export interface AddCommissionPayload {
  commission: string;
  commission_type: string;
  product: string;
}

export interface EditCommissionPayload {
  id: string;
  values: AddCommissionPayload;
}
