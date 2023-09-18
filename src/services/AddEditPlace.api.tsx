import axios, { AxiosResponse } from "axios";
import {
  addPlaceEndPoint,
  POST,
  PUT,
  authHeader,
  publicHeader,
  placeByIdEndPoint,
} from "./Constant";
import { AddPlacePayload, EditPlacePayload } from "../Modal/AddEditPlace.modal";

export const addPlaceAPI = (payload: AddPlacePayload) => {
  const token = localStorage.getItem("token");
  const URL = addPlaceEndPoint;
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

export const editPlaceAPI = (payload: EditPlacePayload) => {
  const token = localStorage.getItem("token");
  const URL = placeByIdEndPoint(payload.id);
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
