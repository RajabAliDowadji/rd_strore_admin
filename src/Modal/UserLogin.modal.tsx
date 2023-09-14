export interface userLoginPayload {
  email: string;
  password: string;
}
export interface UserLoginState {
  isLoading: boolean;
  isError: boolean;
  isErrorMessage: string;
  isLoginSuccess: boolean;
  userLoginResponse: successResponseState;
}
export interface successResponseState {
  status: number;
  message: string;
  data: userData;
  meta: any; //Work IN Future
}

export interface userData {
  _id: string;
  user_name: string;
  phone_number: string;
  email: string;
  user_type: string;
  createdAt: string;
  updatedAt: string;
  token: string;
}

export interface errorResponseState {
  status: number;
  error: errorMsgResponse;
}

export interface errorMsgResponse {
  message: string;
}
