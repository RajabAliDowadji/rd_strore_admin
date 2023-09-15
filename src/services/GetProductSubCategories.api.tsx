import axios from "axios";
import {
  getProductSubCategoriesEndPoint,
  GET,
  authHeader,
  publicHeader,
} from "./Constant";

export const getProductSubCategoriesAPI = () => {
  const token = localStorage.getItem("token");
  const URL = getProductSubCategoriesEndPoint;
  let header;
  if (token) {
    header = authHeader(token);
  } else {
    header = publicHeader;
  }
  const getProductSubCategoriesResponse = axios({
    method: GET,
    url: URL,
    headers: header,
  });
  return getProductSubCategoriesResponse;
};
