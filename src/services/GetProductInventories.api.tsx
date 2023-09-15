import axios from "axios";
import {
  getProductInventoriesEndPoint,
  GET,
  authHeader,
  publicHeader,
} from "./Constant";

export const getProductInventoriesAPI = () => {
  const token = localStorage.getItem("token");
  const URL = getProductInventoriesEndPoint;
  let header;
  if (token) {
    header = authHeader(token);
  } else {
    header = publicHeader;
  }
  const getProductInventoriesResponse = axios({
    method: GET,
    url: URL,
    headers: header,
  });
  return getProductInventoriesResponse;
};
