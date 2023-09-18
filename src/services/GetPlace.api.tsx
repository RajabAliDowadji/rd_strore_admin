import axios, { AxiosResponse } from "axios";
import { getPlaceEndPoint, POST, authHeader, publicHeader } from "./Constant";
import { AddPlacePayload } from "../Modal/AddEditPlace.modal";

export const getPlaceAPI = (payload: AddPlacePayload) => {
  const token = localStorage.getItem("token");
  const URL = getPlaceEndPoint;
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
