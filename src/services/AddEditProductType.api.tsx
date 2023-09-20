import axios, { AxiosResponse } from "axios";
import {
  addProductTypeEndPoint,
  POST,
  PUT,
  authHeader,
  publicHeader,
  productTypeByIdEndPoint,
} from "./Constant";
import {
  AddProductTypePayload,
  EditProductTypePayload,
} from "../Modal/AddEditProductType.modal";

export const addProductTypeAPI = (payload: AddProductTypePayload) => {
  const token = localStorage.getItem("token");
  const URL = addProductTypeEndPoint;
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

export const editProductTypeAPI = (payload: EditProductTypePayload) => {
  const token = localStorage.getItem("token");
  const URL = productTypeByIdEndPoint(payload.id);
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
