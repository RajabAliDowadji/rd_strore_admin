import React, { useEffect, useState } from "react";
import { Box, Button, Fade, Modal, Typography } from "@material-ui/core";
import ActiveButton from "../../../Ui/Button/ActiveButton.web";
import CancelButton from "../../../Ui/Button/CancelButton.web";
import { upload_icon } from "./assets";
import {
  ADD_FILES,
  DELETE_FILE,
  RESET_STATE,
} from "../../../Hooks/Saga/Constant";
import { useDispatch, useSelector } from "react-redux";
import { successToaster } from "../../../Utils/common";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "./FileInput.web.css";

const configJSON = require("../../../Constants/Modal");

interface fileInputProps {
  open: boolean;
  onClose: any;
  name: string;
  multiple: boolean;
  files: any;
  onSuccess: any;
}

const FileInput = ({
  open,
  onClose,
  multiple,
  name,
  onSuccess,
  files,
}: fileInputProps) => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [fileData, setFileData] = useState<any>([]);

  useEffect(() => {
    setFileData(files);
  }, [files]);

  useEffect(() => {
    if (
      state &&
      state.add_edit_files &&
      state.add_edit_files.files &&
      state.add_edit_files.files.length !== 0 &&
      !state.add_edit_files.isError &&
      state.add_edit_files.message !== ""
    ) {
      successToaster(state.add_edit_files.message);
      onSuccess(name, fileData.concat(state.add_edit_files.files));
      dispatch({
        type: RESET_STATE,
        payload: { state: "file" },
      });
    }
  }, [dispatch, fileData, name, onSuccess, state]);

  const onClickFileUpload = () => {
    let bodyData = new FormData();
    const filterData = fileData.filter(
      (file: any) =>
        file._id === null || file._id === "" || file._id === undefined
    );
    if (filterData.length !== 0) {
      filterData.forEach((file: string | Blob) => {
        bodyData.append("file", file);
      });
    } else {
      onSuccess(name, fileData);
    }
    setFileData(
      fileData.filter(
        (file: any) =>
          file._id != null && file._id !== "" && file._id !== undefined
      )
    );
    dispatch({
      type: ADD_FILES,
      payload: bodyData,
    });
  };

  const onFileChange = (event: any) => {
    let files = [...event.target.files];
    files = files.map((file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        file.file_url = reader.result;
      };
      return file;
    });
    setFileData(fileData.concat(files));
  };

  const deleteIconClick = (deletedFile: any) => {
    if (deletedFile._id) {
      dispatch({
        type: DELETE_FILE,
        payload: { id: deletedFile._id },
      });
    }
    const filteredData = fileData.filter(
      (file: any) => file.file_url !== deletedFile.file_url
    );
    setFileData(filteredData);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className="modal"
      open={open}
      onClose={onClose}
      closeAfterTransition
    >
      <Fade in={open} style={{ border: "none" }}>
        <Box className="fileInput_modalSubContainer">
          {fileData.length === 0 ? (
            <Box className="fileInput_uploadContainer">
              <input
                accept="image/png, image/gif, image/jpeg"
                className="imageInput"
                id={name}
                type="file"
                name={name}
                multiple={multiple}
                onChange={onFileChange}
              />
              <label htmlFor={name}>
                <img
                  src={upload_icon}
                  alt="File_Upload_Icon"
                  className="fileInput_uploadImg"
                />
              </label>
              <Typography className="fileInput_modaldescriptionText">
                {configJSON.fileDescTxt}
              </Typography>
              <Typography className="fileInput_modalformatText">
                {configJSON.fileSupportedFormatTxt}
              </Typography>
            </Box>
          ) : (
            <Box className="fileInput_imageContainer">
              <Box className="fileInput_titleContainer">
                <Typography className="fileInput_title">Files</Typography>
                <input
                  accept="image/png, image/gif, image/jpeg"
                  className="imageInput"
                  id={name + "_file"}
                  type="file"
                  name={name}
                  multiple={multiple}
                  onChange={onFileChange}
                />
                <label htmlFor={name + "_file"}>
                  <Button
                    variant="contained"
                    className="fileInput_activeButton"
                    component="span"
                  >
                    Add More Files
                  </Button>
                </label>
              </Box>
              {fileData.map((file: any) => (
                <Box className="fileInput_imageMainSubContainer">
                  <Box className="fileInput_imageSubContainer">
                    <img
                      src={file.file_url}
                      alt="File_URL"
                      className="fileInput_image"
                    />
                    <Box className="fileInput_imageTextContainer">
                      <Typography className="fileInput_imageNameText">
                        <span className="fileInput_titleTxt">File name:- </span>
                        {file.file_name ? file.file_name : file.name}
                      </Typography>
                      <Typography className="fileInput_imageNameText">
                        <span className="fileInput_titleTxt">File size:- </span>
                        {(
                          (file.file_size ? file.file_size : file.size) /
                          1048576
                        ).toFixed(2)}
                        MB
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="fileInput_imageRemoveContainer">
                    <DeleteForeverIcon
                      className="fileInput_deleteIcon"
                      onClick={() => deleteIconClick(file)}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          )}
          <Box className="fileInput_uploadBtnContainer">
            <CancelButton
              title={"Cancel"}
              onClick={onClose}
              disabled={false}
              style={{ width: "205px", margin: "0px 10px 0px 0px" }}
            />
            <ActiveButton
              title={"Upload"}
              onClick={onClickFileUpload}
              disabled={false}
              style={{ width: "205px", margin: "0px 0px 0px 10px" }}
            />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
export default FileInput;
