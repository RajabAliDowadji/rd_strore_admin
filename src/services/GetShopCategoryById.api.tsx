import axios, { AxiosResponse } from "axios";
import {
  shopCategoryByIdEndPoint,
  GET,
  authHeader,
  publicHeader,
} from "./Constant";
import { GetShopCategoryByIdPayload } from "../Modal/GetShopCategoryById.modal";

export const getShopCategoryByIdAPI = (payload: GetShopCategoryByIdPayload) => {
  const token = localStorage.getItem("token");
  const URL = shopCategoryByIdEndPoint(payload.id);
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
