import axios, { AxiosResponse } from "axios";
import {
  deleteFileEndPoint,
  DELETE,
  authHeader,
  publicHeader,
} from "./Constant";
import { deleteFileByIdPayload } from "../Modal/DeleteFile.modal";

export const deleteFileAPI = (payload: deleteFileByIdPayload) => {
  const token = localStorage.getItem("token");
  const URL = deleteFileEndPoint(payload.id);
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
