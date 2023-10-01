import axios, { AxiosResponse } from "axios";
import {
  productByIdEndPoint,
  DELETE,
  authHeader,
  publicHeader,
} from "./Constant";
import { deleteProductByIdPayload } from "../Modal/DeleteProduct.modal";

export const deleteProductAPI = (payload: deleteProductByIdPayload) => {
  const token = localStorage.getItem("token");
  const URL = productByIdEndPoint(payload.id);
  let header;
  if (token) {
    header = authHeader(token);
  } else {
    header = publicHeader;
  }
  return axios({
    method: DELETE,
    url: URL,
    headers: header,
    data: JSON.stringify(payload),
  })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
