import axios, { AxiosResponse } from "axios";
import {
  productSubCategoryByIdEndPoint,
  DELETE,
  authHeader,
  publicHeader,
} from "./Constant";
import { deleteProductSubCategoryByIdPayload } from "../Modal/DeleteProductSubCategory.modal";

export const deleteProductSubCategoryAPI = (
  payload: deleteProductSubCategoryByIdPayload
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
