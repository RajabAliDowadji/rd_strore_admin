import axios from "axios";
import { getShopsEndPoint, GET, authHeader, publicHeader } from "./Constant";

export const getShopsAPI = () => {
  const token = localStorage.getItem("token");
  const URL = getShopsEndPoint;
  let header;
  if (token) {
    header = authHeader(token);
  } else {
    header = publicHeader;
  }
  const getShopsResponse = axios({
    method: GET,
    url: URL,
    headers: header,
  });
  return getShopsResponse;
};
