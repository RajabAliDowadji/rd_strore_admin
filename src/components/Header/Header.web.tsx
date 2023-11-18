import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { color_logo, logout_icon, user_icon } from "./assets";
import "./Header.web.css";

const Header = () => {
  const navigate = useNavigate();
  const user_data = localStorage.getItem("user_data");
  const [userName, setUserName] = useState<string>("");

  const logoHandleClick = () => {
    if (user_data != null) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (user_data && user_data !== null) {
      setUserName(JSON.parse(user_data).user_name);
    }
  }, [user_data]);

  return (
    <Box className="header_mainContainer">
      <Grid container className="header_gridContainer">
        <Grid item xs={6} sm={3} md={3} lg={2}>
          <img
            src={color_logo}
            alt="rd_store_transparent_logo"
            className="header_logoImage"
            onClick={logoHandleClick}
          />
        </Grid>
        <Grid item xs={2} sm={4} md={4} lg={2}>
          <Grid container className="header_btnContainer">
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              className="header_userMainContainer"
            >
              <Box className="header_userContainer">
                <img
                  src={user_icon}
                  alt="header_user_icon"
                  className="header_userIcon"
                />
                <Typography className="header_personText">
                  {userName}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Box
                className="header_logoutContainer"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={logout_icon}
                  alt="header_logout_icon"
                  className="header_logoutIcon"
                />
                <Typography className="header_logoutText">Logout</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Header;
