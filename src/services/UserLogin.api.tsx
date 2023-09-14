import axios from "axios";
import { userLoginEndPoint, POST, header } from "./Constant";
import { userLoginPayload } from "../Modal/UserLogin.modal";

export const userLoginAPI = (payload: userLoginPayload) => {
  const URL = userLoginEndPoint();

  const userLoginResponse = axios({
    method: POST,
    url: URL,
    headers: header,
    data: JSON.stringify(payload),
  });
  return userLoginResponse;
};
