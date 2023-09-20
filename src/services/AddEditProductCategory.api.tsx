import axios, { AxiosResponse } from "axios";
import {
  addProductCategoryEndPoint,
  POST,
  PUT,
  authHeader,
  publicHeader,
  productCategoryByIdEndPoint,
} from "./Constant";
import {
  AddProductCategoryPayload,
  EditProductCategoryPayload,
} from "../Modal/AddEditProductCategory.modal";

export const addProductCategoryAPI = (payload: AddProductCategoryPayload) => {
  const token = localStorage.getItem("token");
  const URL = addProductCategoryEndPoint;
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

export const editProductCategoryAPI = (payload: EditProductCategoryPayload) => {
  const token = localStorage.getItem("token");
  const URL = productCategoryByIdEndPoint(payload.id);
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
