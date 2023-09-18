export interface GetCommissionTypesState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  commissionTypes: CommissionType[];
}
export interface SuccessResponseState {
  status: number;
  message: string;
  data: CommissionType[];
  meta: any; //Work IN Future
}

export interface CommissionType {
  _id: string;
  commission_name: string;
  commission_sign: string;
  createdAt?: string;
  updatedAt?: string;
}
