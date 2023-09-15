import axios from "axios";
import {
  getShopCategoriesEndPoint,
  GET,
  authHeader,
  publicHeader,
} from "./Constant";

export const getShopCategoriesAPI = () => {
  const token = localStorage.getItem("token");
  const URL = getShopCategoriesEndPoint;
  let header;
  if (token) {
    header = authHeader(token);
  } else {
    header = publicHeader;
  }
  const getShopCategoriesResponse = axios({
    method: GET,
    url: URL,
    headers: header,
  });
  return getShopCategoriesResponse;
};
