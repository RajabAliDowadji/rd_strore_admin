import axios from "axios";
import { userLoginEndPoint, POST, publicHeader } from "./Constant";
import { UserLoginPayload } from "../Modal/UserLogin.modal";

export const userLoginAPI = (payload: UserLoginPayload) => {
  const URL = userLoginEndPoint;

  const userLoginResponse = axios({
    method: POST,
    url: URL,
    headers: publicHeader,
    data: JSON.stringify(payload),
  });
  return userLoginResponse;
};
