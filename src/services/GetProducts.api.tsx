import axios from "axios";
import { getProductsEndPoint, GET, authHeader, publicHeader } from "./Constant";

export const getProductsAPI = () => {
  const token = localStorage.getItem("token");
  const URL = getProductsEndPoint;
  let header;
  if (token) {
    header = authHeader(token);
  } else {
    header = publicHeader;
  }
  const getProductsResponse = axios({
    method: GET,
    url: URL,
    headers: header,
  });
  return getProductsResponse;
};
