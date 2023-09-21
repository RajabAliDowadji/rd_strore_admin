import axios, { AxiosResponse } from "axios";
import {
  addProductSubCategoryEndPoint,
  POST,
  PUT,
  authHeader,
  publicHeader,
  productSubCategoryByIdEndPoint,
} from "./Constant";
import {
  AddProductSubCategoryPayload,
  EditProductSubCategoryPayload,
} from "../Modal/AddEditProductSubCategory.modal";

export const addProductSubCategoryAPI = (
  payload: AddProductSubCategoryPayload
) => {
  const token = localStorage.getItem("token");
  const URL = addProductSubCategoryEndPoint;
  let header;
  if (token) {
    header = authHeader(token);
  } else {
    header = publicHeader;
  }
  return axios({
    method: POST,
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

export const editProductSubCategoryAPI = (
  payload: EditProductSubCategoryPayload
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
    method: PUT,
    url: URL,
    headers: header,
    data: JSON.stringify(payload.values),
  })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
