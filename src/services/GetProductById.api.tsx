import axios, { AxiosResponse } from "axios";
import { productByIdEndPoint, GET, authHeader, publicHeader } from "./Constant";
import { GetProductByIdPayload } from "../Modal/GetProductById.modal";

export const getProductByIdAPI = (payload: GetProductByIdPayload) => {
  const token = localStorage.getItem("token");
  const URL = productByIdEndPoint(payload.id);
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
