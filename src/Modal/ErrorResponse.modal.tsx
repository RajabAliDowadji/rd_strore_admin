export interface ErrorResponseState {
  status: number;
  error: ErrorMsgResponse;
}

export interface ErrorMsgResponse {
  message: string;
}
