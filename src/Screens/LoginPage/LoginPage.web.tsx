import React from "react";
import { Box, Grid } from "@material-ui/core";
import Login from "../../components/Login/Login.web";
import PrivateHeader from "../../components/Header/PrivateHeader.web";
import "./LoginPage.web.css";

const LoginPage = () => {
  return (
    <Box className="loginPage_mainContainer">
      <PrivateHeader />
      <Box className="loginPage_loginContainer">
        <Grid container>
          <Grid
            item
            xs={11}
            sm={9}
            md={6}
            lg={4}
            className="loginPage_loginSubContainer"
          >
            <Login />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginPage;
