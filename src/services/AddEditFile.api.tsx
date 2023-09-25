import axios, { AxiosResponse } from "axios";
import { addFileENDPOINT, POST, fileHeader, publicHeader } from "./Constant";
import { AddFilePayload } from "../Modal/AddEditFile.modal";

export const addFileAPI = (payload: AddFilePayload) => {
  const token = localStorage.getItem("token");
  const URL = addFileENDPOINT;
  let header;
  if (token) {
    header = fileHeader(token);
  } else {
    header = publicHeader;
  }
  return axios({
    method: POST,
    url: URL,
    headers: header,
    data: payload,
  })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
