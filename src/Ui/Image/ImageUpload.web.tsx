import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import "./ImageUpload.web.css";

interface ImageUploadProps {
  profile_placeHolder: string;
  title: string;
  description: string;
  imageUrl: string;
  errorText?: string;
  onFileChange?: any;
  onClick?: any;
  view?: boolean;
  name: string;
}
const ImageUpload = ({
  profile_placeHolder,
  title,
  description,
  errorText,
  imageUrl,
  onFileChange,
  onClick,
  name,
  view,
}: ImageUploadProps) => {
  const onBtnClick = () => {
    onClick(name);
  };
  return (
    <Box className="imageContainer">
      <label htmlFor={name}>
        <img
          src={
            imageUrl && imageUrl !== null && imageUrl !== ""
              ? imageUrl
              : profile_placeHolder
          }
          alt="Profile Place Holder"
          className="profileplaceHolder"
        />
      </label>
      <Box>
        <Typography className="imageTitleTxt">{title}</Typography>
        <Typography className="imageDescTxt">{description}</Typography>
        {errorText && (
          <Typography className="imageDescTxt errorTxt">{errorText}</Typography>
        )}

        <input
          accept="image/png, image/gif, image/jpeg"
          className="imageInput"
          id={name}
          type="file"
          name={name}
          onChange={onFileChange}
        />
        {view ? (
          <></>
        ) : (
          <Button
            variant="contained"
            component="span"
            className="imageUploadBtn"
            onClick={onBtnClick}
          >
            Upload
          </Button>
        )}
      </Box>
    </Box>
  );
};
export default ImageUpload;
