import { CommissionType } from "./GetCommissionTypes.modal";

export interface GetCommissionTypeByIdState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  commissionType: CommissionType | null;
}
export interface SuccessResponseState {
  status: number;
  message: string;
  data: CommissionType;
  meta: any; //Work IN Future
}
export interface GetCommissionTypeByIdPayload {
  id: string;
}
export interface GetCommissionTypeByIdResponse {
  _id?: string;
  commission_name: string;
  commission_sign: string;
}
