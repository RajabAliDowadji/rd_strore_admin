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
  onClick: any;
}
const MultipleImageUpload = ({
  uploadimg_placeHolder,
  noimage_placeHolder,
  title,
  error,
  errorText,
  selectedImage,
  onClick,
}: MultipleImageUploadProps) => {
  return (
    <Box className="multipleImageContainer">
      <fieldset className="multipleImageContainer_fieldset">
        <legend className="multipleImageContainer_title">{title}</legend>
        <Box className="multipleImage_subContainer">
          <img
            src={uploadimg_placeHolder}
            className="multipleImage_placeHolder"
            alt="Profile Place Holder"
            onClick={onClick}
          />
          <Grid container spacing={2}>
            {selectedImage.map((image: any) => (
              <Grid item xs={2}>
                <img
                  src={image.file_url ? image.file_url : noimage_placeHolder}
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
