import axios from "axios";
import { getPlacesEndPoint, GET, authHeader, publicHeader } from "./Constant";

export const getPlacesAPI = () => {
  const token = localStorage.getItem("token");
  const URL = getPlacesEndPoint;
  let header;
  if (token) {
    header = authHeader(token);
  } else {
    header = publicHeader;
  }
  const getPlacesResponse = axios({
    method: GET,
    url: URL,
    headers: header,
  });
  return getPlacesResponse;
};
