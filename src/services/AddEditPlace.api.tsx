import axios from "axios";
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
  const addPlaceResponse = axios({
    method: POST,
    url: URL,
    headers: header,
    data: JSON.stringify(payload),
  });
  return addPlaceResponse;
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
  const addPlaceResponse = axios({
    method: PUT,
    url: URL,
    headers: header,
    data: JSON.stringify(payload.values),
  });
  return addPlaceResponse;
};
