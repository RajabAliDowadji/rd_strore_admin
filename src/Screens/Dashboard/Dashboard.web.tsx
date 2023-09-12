import React from "react";
import { Box } from "@material-ui/core";
import CustomDrawer from "../../components/CustomDrawer/CustomDrawer.web";
import Header from "../../components/Header/Header.web";
import "./Dashboard.web.css";

const Dashboard = (props: any) => {
  return (
    <Box className="dashboard_mainContainer">
      <Header />
      <Box className="dashboard_innerContainer">
        <CustomDrawer>{props.children}</CustomDrawer>
      </Box>
    </Box>
  );
};

export default Dashboard;
