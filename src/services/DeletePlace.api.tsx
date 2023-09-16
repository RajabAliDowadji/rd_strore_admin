import axios from "axios";
import {
  placeByIdEndPoint,
  DELETE,
  authHeader,
  publicHeader,
} from "./Constant";
import { deletePlaceByIdPayload } from "../Modal/DeletePlace.modal";

export const deletePlaceAPI = (payload: deletePlaceByIdPayload) => {
  const token = localStorage.getItem("token");
  const URL = placeByIdEndPoint(payload.id);
  let header;
  if (token) {
    header = authHeader(token);
  } else {
    header = publicHeader;
  }
  const addPlaceResponse = axios({
    method: DELETE,
    url: URL,
    headers: header,
  });
  return addPlaceResponse;
};
