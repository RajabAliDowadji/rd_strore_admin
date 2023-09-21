import axios, { AxiosResponse } from "axios";
import {
  productBrandByIdEndPoint,
  GET,
  authHeader,
  publicHeader,
} from "./Constant";
import { GetProductBrandByIdPayload } from "../Modal/GetProductBrandById.modal";

export const getProductBrandByIdAPI = (payload: GetProductBrandByIdPayload) => {
  const token = localStorage.getItem("token");
  const URL = productBrandByIdEndPoint(payload.id);
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
