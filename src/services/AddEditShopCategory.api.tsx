import axios, { AxiosResponse } from "axios";
import {
  addShopCategoryEndPoint,
  POST,
  PUT,
  authHeader,
  publicHeader,
  shopCategoryByIdEndPoint,
} from "./Constant";
import {
  AddShopCategoryPayload,
  EditShopCategoryPayload,
} from "../Modal/AddEditShopCategory.modal";

export const addShopCategoryAPI = (payload: AddShopCategoryPayload) => {
  const token = localStorage.getItem("token");
  const URL = addShopCategoryEndPoint;
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

export const editShopCategoryAPI = (payload: EditShopCategoryPayload) => {
  const token = localStorage.getItem("token");
  const URL = shopCategoryByIdEndPoint(payload.id);
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
