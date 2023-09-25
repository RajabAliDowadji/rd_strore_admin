import axios, { AxiosResponse } from "axios";
import { shopByIdEndPoint, GET, authHeader, publicHeader } from "./Constant";
import { GetShopByIdPayload } from "../Modal/GetShopById.modal";

export const getShopByIdAPI = (payload: GetShopByIdPayload) => {
  const token = localStorage.getItem("token");
  const URL = shopByIdEndPoint(payload.id);
  let header;
  if (token) {
    header = authHeader(token);
  } else {
    header = publicHeader;
  }
  return axios({
    method: GET,
    url: URL,
    headers: header,
  })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
