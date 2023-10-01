import React from "react";
import { Box, Grid } from "@material-ui/core";
import "./ImageUpload.web.css";

interface ViewMultiImagesProps {
  noimage_placeHolder: string;
  title: string;
  selectedImage: any;
}
const ViewMultiImages = ({
  noimage_placeHolder,
  title,
  selectedImage,
}: ViewMultiImagesProps) => {
  return (
    <Box className="multipleImageContainer">
      <fieldset className="multipleImageContainer_fieldset">
        <legend className="multipleImageContainer_title">{title}</legend>
        <Box className="multipleImage_subContainer">
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
      </fieldset>
    </Box>
  );
};
export default ViewMultiImages;
