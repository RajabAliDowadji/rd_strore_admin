import React from "react";
import { Box, Typography } from "@material-ui/core";
import { no_data } from "./assets";
import "./Data.web.css";

const NoDataFound = () => {
  return (
    <Box className="noDataImgContainer">
      <img
        src={no_data}
        alt="Profile Place Holder"
        className="noDataFoundImg"
      />
      <Typography className="noDataImgTitleTxt">No Record Found</Typography>
    </Box>
  );
};

export default NoDataFound;
