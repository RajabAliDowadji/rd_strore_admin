import axios from "axios";
import {
  getProductTypesEndPoint,
  GET,
  authHeader,
  publicHeader,
} from "./Constant";

export const getProductTypesAPI = () => {
  const token = localStorage.getItem("token");
  const URL = getProductTypesEndPoint;
  let header;
  if (token) {
    header = authHeader(token);
  } else {
    header = publicHeader;
  }
  const getProductTypesResponse = axios({
    method: GET,
    url: URL,
    headers: header,
  });
  return getProductTypesResponse;
};
