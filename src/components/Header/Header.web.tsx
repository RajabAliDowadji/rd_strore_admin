import React, { useEffect, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { White_logo } from "./assets";

import "./Header.web.css";

const Header = () => {
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();
  const auth = localStorage.getItem("user_data");
  useEffect(() => {
    if (auth) {
      setUserData(JSON.parse(auth));
    } else {
      setUserData(null);
    }
  }, [auth, navigate]);
  const logoutHandleClick = () => {
    localStorage.removeItem("user_data");
    localStorage.removeItem("token");
    navigate("/login");
  };
  const logoHandleClick = () => {
    if (userData != null) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };
  return (
    <Box className="header_mainContainer">
      <Grid container className="header_mainGrid">
        <Grid item xs={4} lg={2} md={2}>
          <img
            src={White_logo}
            alt="white_logo_image"
            className="header_logo"
            onClick={logoHandleClick}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Header;
