import axios, { AxiosResponse } from "axios";
import { addFilesENDPOINT, POST, fileHeader, publicHeader } from "./Constant";
import { AddFilesPayload } from "../Modal/AddEditFiles.modal";

export const addFilesAPI = (payload: AddFilesPayload) => {
  const token = localStorage.getItem("token");
  const URL = addFilesENDPOINT;
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
