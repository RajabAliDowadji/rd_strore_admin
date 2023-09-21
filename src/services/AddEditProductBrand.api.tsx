import axios, { AxiosResponse } from "axios";
import {
  addProductBrandEndPoint,
  POST,
  PUT,
  authHeader,
  publicHeader,
  productBrandByIdEndPoint,
} from "./Constant";
import {
  AddProductBrandPayload,
  EditProductBrandPayload,
} from "../Modal/AddEditProductBrand.modal";

export const addProductBrandAPI = (payload: AddProductBrandPayload) => {
  const token = localStorage.getItem("token");
  const URL = addProductBrandEndPoint;
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

export const editProductBrandAPI = (payload: EditProductBrandPayload) => {
  const token = localStorage.getItem("token");
  const URL = productBrandByIdEndPoint(payload.id);
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
