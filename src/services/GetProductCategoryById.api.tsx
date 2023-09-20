import axios, { AxiosResponse } from "axios";
import {
  productCategoryByIdEndPoint,
  GET,
  authHeader,
  publicHeader,
} from "./Constant";
import { GetProductCategoryByIdPayload } from "../Modal/GetProductCategoryById.modal";

export const getProductCategoryByIdAPI = (
  payload: GetProductCategoryByIdPayload
) => {
  const token = localStorage.getItem("token");
  const URL = productCategoryByIdEndPoint(payload.id);
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
