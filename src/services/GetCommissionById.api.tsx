import axios, { AxiosResponse } from "axios";
import {
  commissionByIdEndPoint,
  GET,
  authHeader,
  publicHeader,
} from "./Constant";
import { GetCommissionByIdPayload } from "../Modal/GetCommissionById.modal";

export const getCommissionByIdAPI = (payload: GetCommissionByIdPayload) => {
  const token = localStorage.getItem("token");
  const URL = commissionByIdEndPoint(payload.id);
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
