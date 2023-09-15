import axios from "axios";
import {
  getProductBrandsEndPoint,
  GET,
  authHeader,
  publicHeader,
} from "./Constant";

export const getProductBrandsAPI = () => {
  const token = localStorage.getItem("token");
  const URL = getProductBrandsEndPoint;
  let header;
  if (token) {
    header = authHeader(token);
  } else {
    header = publicHeader;
  }
  const getProductBrandsResponse = axios({
    method: GET,
    url: URL,
    headers: header,
  });
  return getProductBrandsResponse;
};
