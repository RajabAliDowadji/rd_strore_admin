import axios, { AxiosResponse } from "axios";
import { placeByIdEndPoint, GET, authHeader, publicHeader } from "./Constant";
import { GetPlaceByIdPayload } from "../Modal/GetPlaceById.modal";

export const getPlaceByIdAPI = (payload: GetPlaceByIdPayload) => {
  const token = localStorage.getItem("token");
  const URL = placeByIdEndPoint(payload.id);
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
