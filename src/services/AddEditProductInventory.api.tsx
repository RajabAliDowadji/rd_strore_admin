import axios, { AxiosResponse } from "axios";
import {
  addProductInventoryEndPoint,
  POST,
  PUT,
  authHeader,
  publicHeader,
  productInventoryByIdEndPoint,
} from "./Constant";
import {
  AddProductInventoryPayload,
  EditProductInventoryPayload,
} from "../Modal/AddEditProductInventory.modal";

export const addProductInventoryAPI = (payload: AddProductInventoryPayload) => {
  const token = localStorage.getItem("token");
  const URL = addProductInventoryEndPoint;
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

export const editProductInventoryAPI = (
  payload: EditProductInventoryPayload
) => {
  const token = localStorage.getItem("token");
  const URL = productInventoryByIdEndPoint(payload.id);
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
