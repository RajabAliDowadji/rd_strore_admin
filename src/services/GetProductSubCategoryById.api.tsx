import axios, { AxiosResponse } from "axios";
import {
  productSubCategoryByIdEndPoint,
  GET,
  authHeader,
  publicHeader,
} from "./Constant";
import { GetProductSubCategoryByIdPayload } from "../Modal/GetProductSubCategoryById.modal";

export const getProductSubCategoryByIdAPI = (
  payload: GetProductSubCategoryByIdPayload
) => {
  const token = localStorage.getItem("token");
  const URL = productSubCategoryByIdEndPoint(payload.id);
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
