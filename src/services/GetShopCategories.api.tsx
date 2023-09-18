import axios, { AxiosResponse } from "axios";
import {
  getShopCategoriesEndPoint,
  GET,
  authHeader,
  publicHeader,
} from "./Constant";

export const getShopCategoriesAPI = () => {
  const token = localStorage.getItem("token");
  const URL = getShopCategoriesEndPoint;
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
