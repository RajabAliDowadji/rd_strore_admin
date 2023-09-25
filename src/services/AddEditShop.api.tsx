import axios, { AxiosResponse } from "axios";
import {
  addShopEndPoint,
  POST,
  PUT,
  authHeader,
  publicHeader,
  shopByIdEndPoint,
} from "./Constant";
import { AddShopPayload, EditShopPayload } from "../Modal/AddEditShop.modal";

export const addShopAPI = (payload: AddShopPayload) => {
  const token = localStorage.getItem("token");
  const URL = addShopEndPoint;
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

export const editShopAPI = (payload: EditShopPayload) => {
  const token = localStorage.getItem("token");
  const URL = shopByIdEndPoint(payload.id);
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
