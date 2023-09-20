import axios, { AxiosResponse } from "axios";
import {
  productTypeByIdEndPoint,
  GET,
  authHeader,
  publicHeader,
} from "./Constant";
import { GetProductTypeByIdPayload } from "../Modal/GetProductTypeById.modal";

export const getProductTypeByIdAPI = (payload: GetProductTypeByIdPayload) => {
  const token = localStorage.getItem("token");
  const URL = productTypeByIdEndPoint(payload.id);
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
