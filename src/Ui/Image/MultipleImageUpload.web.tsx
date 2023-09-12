import React from "react";
import { Box, Grid } from "@material-ui/core";
import "./ImageUpload.web.css";

interface MultipleImageUploadProps {
  uploadimg_placeHolder: string;
  noimage_placeHolder: string;
  title: string;
  selectedImage: any;
  error: boolean;
  errorText: string;
  onFileChange: any;
}
const MultipleImageUpload = ({
  uploadimg_placeHolder,
  noimage_placeHolder,
  title,
  error,
  errorText,
  selectedImage,
  onFileChange,
}: MultipleImageUploadProps) => {
  return (
    <Box className="multipleImageContainer">
      <fieldset className="multipleImageContainer_fieldset">
        <legend className="multipleImageContainer_title">{title}</legend>
        <Box className="multipleImage_subContainer">
          <input
            accept="image/png, image/gif, image/jpeg"
            className="imageInput"
            id="contained-button-file"
            type="file"
            onChange={onFileChange}
          />
          <label htmlFor="contained-button-file">
            <img
              src={uploadimg_placeHolder}
              className="multipleImage_placeHolder"
              alt="Profile Place Holder"
            />
          </label>
          <Grid container spacing={2}>
            {selectedImage.map((image: any) => (
              <Grid item xs={2}>
                <img
                  src={image.imageURL ? image.imageURL : noimage_placeHolder}
                  className="multipleImage_noimage"
                  alt="NoImage Place Holder"
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        {error && <Box className="multipleImage_errorText">{errorText}</Box>}
      </fieldset>
    </Box>
  );
};
export default MultipleImageUpload;
