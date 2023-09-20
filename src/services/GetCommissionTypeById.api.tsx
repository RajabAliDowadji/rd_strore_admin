import axios, { AxiosResponse } from "axios";
import {
  commissionTypeByIdEndPoint,
  GET,
  authHeader,
  publicHeader,
} from "./Constant";
import { GetCommissionTypeByIdPayload } from "../Modal/GetCommissionTypeById.modal";

export const getCommissionTypeByIdAPI = (
  payload: GetCommissionTypeByIdPayload
) => {
  const token = localStorage.getItem("token");
  const URL = commissionTypeByIdEndPoint(payload.id);
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
