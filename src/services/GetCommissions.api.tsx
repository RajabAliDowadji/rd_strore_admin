import axios, { AxiosResponse } from "axios";
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
  return axios({
    method: GET,
    url: URL,
    headers: header,
  })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
