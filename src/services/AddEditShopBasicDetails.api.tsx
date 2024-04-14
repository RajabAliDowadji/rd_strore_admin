import axios, { AxiosResponse } from "axios";
import {
  addShopBasicDetailsEndPoint,
  editShopBasicDetailsEndPoint,
  POST,
  PUT,
  authHeader,
  publicHeader,
} from "./Constant";
import {
  AddShopBasicDetailsPayload,
  EditShopBasicDetailsPayload,
} from "../Modal/AddEditShopBasicDetails.modal";

export const addShopBasicDetailsAPI = (payload: AddShopBasicDetailsPayload) => {
  const token = localStorage.getItem("token");
  const URL = addShopBasicDetailsEndPoint;
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

export const editShopBasicDetailsAPI = (
  payload: EditShopBasicDetailsPayload
) => {
  const token = localStorage.getItem("token");
  const URL = editShopBasicDetailsEndPoint(payload.id);
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
