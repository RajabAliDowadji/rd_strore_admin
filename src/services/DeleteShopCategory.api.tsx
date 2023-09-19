import axios, { AxiosResponse } from "axios";
import {
  shopCategoryByIdEndPoint,
  DELETE,
  authHeader,
  publicHeader,
} from "./Constant";
import { deleteShopCategoryByIdPayload } from "../Modal/DeleteShopCategory.modal";

export const deleteShopCategoryAPI = (
  payload: deleteShopCategoryByIdPayload
) => {
  const token = localStorage.getItem("token");
  const URL = shopCategoryByIdEndPoint(payload.id);
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
