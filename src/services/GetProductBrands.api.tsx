import axios, { AxiosResponse } from "axios";
import {
  getProductBrandsEndPoint,
  GET,
  authHeader,
  publicHeader,
} from "./Constant";

export const getProductBrandsAPI = () => {
  const token = localStorage.getItem("token");
  const URL = getProductBrandsEndPoint;
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
