import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import "./ImageUpload.web.css";

interface ImageUploadProps {
  profile_placeHolder: string;
  title: string;
  description: string;
  imageUrl: string;
  errorText?: string;
  onFileChange: any;
}
const ImageUpload = ({
  profile_placeHolder,
  title,
  description,
  errorText,
  imageUrl,
  onFileChange,
}: ImageUploadProps) => {
  return (
    <Box className="imageContainer">
      <img
        src={imageUrl ? imageUrl : profile_placeHolder}
        alt="Profile Place Holder"
        className="profileplaceHolder"
      />
      <Box>
        <Typography className="imageTitleTxt">{title}</Typography>
        <Typography className="imageDescTxt">{description}</Typography>
        {errorText && (
          <Typography className="imageDescTxt errorTxt">{errorText}</Typography>
        )}
        <input
          accept="image/png, image/gif, image/jpeg"
          className="imageInput"
          id="contained-button-file"
          type="file"
          onChange={onFileChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            component="span"
            className="imageUploadBtn"
          >
            Upload
          </Button>
        </label>
      </Box>
    </Box>
  );
};
export default ImageUpload;
