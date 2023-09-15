import axios from "axios";
import {
  getCommissionsEndPoint,
  GET,
  authHeader,
  publicHeader,
} from "./Constant";

export const getCommissionsAPI = () => {
  const token = localStorage.getItem("token");
  const URL = getCommissionsEndPoint;
  let header;
  if (token) {
    header = authHeader(token);
  } else {
    header = publicHeader;
  }
  const getCommissionsResponse = axios({
    method: GET,
    url: URL,
    headers: header,
  });
  return getCommissionsResponse;
};
