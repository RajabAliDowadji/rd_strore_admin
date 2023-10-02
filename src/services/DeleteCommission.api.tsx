import axios, { AxiosResponse } from "axios";
import {
  commissionByIdEndPoint,
  DELETE,
  authHeader,
  publicHeader,
} from "./Constant";
import { deleteCommissionByIdPayload } from "../Modal/DeleteCommission.modal";

export const deleteCommissionAPI = (payload: deleteCommissionByIdPayload) => {
  const token = localStorage.getItem("token");
  const URL = commissionByIdEndPoint(payload.id);
  let header;
  if (token) {
    header = authHeader(token);
  } else {
    header = publicHeader;
  }
  return axios({
    method: DELETE,
    url: URL,
    headers: header,
    data: JSON.stringify(payload),
  })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
