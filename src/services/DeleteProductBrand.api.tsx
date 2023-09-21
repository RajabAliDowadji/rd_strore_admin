import axios, { AxiosResponse } from "axios";
import {
  productBrandByIdEndPoint,
  DELETE,
  authHeader,
  publicHeader,
} from "./Constant";
import { deleteProductBrandByIdPayload } from "../Modal/DeleteProductBrand.modal";

export const deleteProductBrandAPI = (
  payload: deleteProductBrandByIdPayload
) => {
  const token = localStorage.getItem("token");
  const URL = productBrandByIdEndPoint(payload.id);
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
