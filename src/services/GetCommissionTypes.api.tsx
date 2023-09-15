import axios from "axios";
import {
  getCommissionTypesEndPoint,
  GET,
  authHeader,
  publicHeader,
} from "./Constant";

export const getCommissionTypesAPI = () => {
  const token = localStorage.getItem("token");
  const URL = getCommissionTypesEndPoint;
  let header;
  if (token) {
    header = authHeader(token);
  } else {
    header = publicHeader;
  }
  const getCommissionTypesResponse = axios({
    method: GET,
    url: URL,
    headers: header,
  });
  return getCommissionTypesResponse;
};
