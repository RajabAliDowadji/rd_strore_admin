import axios, { AxiosResponse } from "axios";
import { userLoginEndPoint, POST, publicHeader } from "./Constant";
import { UserLoginPayload } from "../Modal/UserLogin.modal";

export const userLoginAPI = (payload: UserLoginPayload) => {
  const URL = userLoginEndPoint;

  return axios({
    method: POST,
    url: URL,
    headers: publicHeader,
    data: JSON.stringify(payload),
  })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
