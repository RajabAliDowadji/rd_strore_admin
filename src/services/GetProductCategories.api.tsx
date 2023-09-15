import axios from "axios";
import {
  getProductCategoriesEndPoint,
  GET,
  authHeader,
  publicHeader,
} from "./Constant";

export const getProductCategoriesAPI = () => {
  const token = localStorage.getItem("token");
  const URL = getProductCategoriesEndPoint;
  let header;
  if (token) {
    header = authHeader(token);
  } else {
    header = publicHeader;
  }
  const getProductCategoriesResponse = axios({
    method: GET,
    url: URL,
    headers: header,
  });
  return getProductCategoriesResponse;
};
