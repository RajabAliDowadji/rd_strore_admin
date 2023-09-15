import axios from "axios";
import {
  getProductRatingsEndPoint,
  GET,
  authHeader,
  publicHeader,
} from "./Constant";

export const getProductRatingsAPI = () => {
  const token = localStorage.getItem("token");
  const URL = getProductRatingsEndPoint;
  let header;
  if (token) {
    header = authHeader(token);
  } else {
    header = publicHeader;
  }
  const getProductRatingsResponse = axios({
    method: GET,
    url: URL,
    headers: header,
  });
  return getProductRatingsResponse;
};
