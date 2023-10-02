import axios, { AxiosResponse } from "axios";
import {
  addCommissionEndPoint,
  POST,
  PUT,
  authHeader,
  publicHeader,
  commissionByIdEndPoint,
} from "./Constant";
import {
  AddCommissionPayload,
  EditCommissionPayload,
} from "../Modal/AddEditCommission.modal";

export const addCommissionAPI = (payload: AddCommissionPayload) => {
  const token = localStorage.getItem("token");
  const URL = addCommissionEndPoint;
  let header;
  if (token) {
    header = authHeader(token);
  } else {
    header = publicHeader;
  }
  return axios({
    method: POST,
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

export const editCommissionAPI = (payload: EditCommissionPayload) => {
  const token = localStorage.getItem("token");
  const URL = commissionByIdEndPoint(payload.id);
  let header;
  if (token) {
    header = authHeader(token);
  } else {
    header = publicHeader;
  }

  return axios({
    method: PUT,
    url: URL,
    headers: header,
    data: JSON.stringify(payload.values),
  })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
