import React from "react";
import { Box } from "@material-ui/core";
import CustomDrawer from "../../components/CustomDrawer/CustomDrawer.web";
import Header from "../../components/Header/Header.web";
import "./DashboardPage.web.css";

const DashboardPage = (props: any) => {
  return (
    <Box className="dashboardPage_mainContainer">
      <Header />
      <CustomDrawer />
      <Box className="dashboardPage_innerContainer">{props.children}</Box>
    </Box>
  );
};

export default DashboardPage;
