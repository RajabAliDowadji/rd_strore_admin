import axios, { AxiosResponse } from "axios";
import {
  commissionTypeByIdEndPoint,
  DELETE,
  authHeader,
  publicHeader,
} from "./Constant";
import { deleteCommissionTypeByIdPayload } from "../Modal/DeleteCommissionType.modal";

export const deleteCommissionTypeAPI = (
  payload: deleteCommissionTypeByIdPayload
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
