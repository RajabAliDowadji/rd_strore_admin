import axios, { AxiosResponse } from "axios";
import {
  addProductEndPoint,
  POST,
  PUT,
  authHeader,
  publicHeader,
  productByIdEndPoint,
} from "./Constant";
import {
  AddProductPayload,
  EditProductPayload,
} from "../Modal/AddEditProduct.modal";

export const addProductAPI = (payload: AddProductPayload) => {
  const token = localStorage.getItem("token");
  const URL = addProductEndPoint;
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

export const editProductAPI = (payload: EditProductPayload) => {
  const token = localStorage.getItem("token");
  const URL = productByIdEndPoint(payload.id);
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
