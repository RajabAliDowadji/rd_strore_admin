export interface DeleteProductTypeState {
  isLoading: boolean;
  isError: boolean;
  message: string;
}
export interface SuccessResponseState {
  status: number;
  message: string;
  data: null;
  meta: any; //Work IN Future
}

export interface deleteProductTypeByIdPayload {
  id: string;
}
