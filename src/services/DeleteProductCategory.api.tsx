import axios, { AxiosResponse } from "axios";
import {
  productCategoryByIdEndPoint,
  DELETE,
  authHeader,
  publicHeader,
} from "./Constant";
import { deleteProductCategoryByIdPayload } from "../Modal/DeleteProductCategory.modal";

export const deleteProductCategoryAPI = (
  payload: deleteProductCategoryByIdPayload
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
