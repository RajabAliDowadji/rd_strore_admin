import axios, { AxiosResponse } from "axios";
import {
  addCommissionTypeEndPoint,
  POST,
  PUT,
  authHeader,
  publicHeader,
  commissionTypeByIdEndPoint,
} from "./Constant";
import {
  AddCommissionTypePayload,
  EditCommissionTypePayload,
} from "../Modal/AddEditCommissionType.modal";

export const addCommissionTypeAPI = (payload: AddCommissionTypePayload) => {
  const token = localStorage.getItem("token");
  const URL = addCommissionTypeEndPoint;
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

export const editCommissionTypeAPI = (payload: EditCommissionTypePayload) => {
  const token = localStorage.getItem("token");
  const URL = commissionTypeByIdEndPoint(payload.id);
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
