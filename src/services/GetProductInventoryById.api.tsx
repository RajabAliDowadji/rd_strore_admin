import axios, { AxiosResponse } from "axios";
import {
  productInventoryByIdEndPoint,
  GET,
  authHeader,
  publicHeader,
} from "./Constant";
import { GetProductInventoryByIdPayload } from "../Modal/GetProductInventoryById.modal";

export const getProductInventoryByIdAPI = (
  payload: GetProductInventoryByIdPayload
) => {
  const token = localStorage.getItem("token");
  const URL = productInventoryByIdEndPoint(payload.id);
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
