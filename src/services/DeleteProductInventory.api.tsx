import axios, { AxiosResponse } from "axios";
import {
  productInventoryByIdEndPoint,
  DELETE,
  authHeader,
  publicHeader,
} from "./Constant";
import { deleteProductInventoryByIdPayload } from "../Modal/DeleteProductInventory.modal";

export const deleteProductInventoryAPI = (
  payload: deleteProductInventoryByIdPayload
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
