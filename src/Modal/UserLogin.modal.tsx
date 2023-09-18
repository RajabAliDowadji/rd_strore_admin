import { ErrorResponseState } from "./ErrorResponse.modal";

export interface UserLoginPayload {
  email: string;
  password: string;
}
export interface UserLoginState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  isLoginSuccess: boolean;
  userLoginResponse: SuccessResponseState | ErrorResponseState;
}
export interface SuccessResponseState {
  status: number;
  message: string;
  data: UserData;
  meta: any; //Work IN Future
}

export interface UserData {
  _id: string;
  user_name: string;
  phone_number: string;
  email: string;
  user_type: string;
  createdAt: string;
  updatedAt: string;
  token: string;
}
