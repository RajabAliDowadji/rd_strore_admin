import axios, { AxiosResponse } from "axios";
import {
  getAdminCommissionEndPoint,
  GET,
  authHeader,
  publicHeader,
} from "./Constant";

export const getAdminCommissionAPI = () => {
  const token = localStorage.getItem("token");
  const URL = getAdminCommissionEndPoint;
  let header;
  if (token) {
    header = authHeader(token);
  } else {
    header = publicHeader;
  }
  return axios({
    method: GET,
    url: URL,
    headers: header,
  })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
