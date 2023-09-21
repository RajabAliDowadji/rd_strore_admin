import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import { RESET_STATE } from "../../Hooks/Saga/Constant";
import { useDispatch } from "react-redux";
import "./CustomDrawer.web.css";

const configJSON = require("../../Constants/Dashboard");

interface menuProps {
  id: string;
  title: string;
  route: string;
  tabClick?: any;
}
const CustomDrawer = (props: any) => {
  const [pathRoute, setPathRoute] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const route = location.pathname.split("/");
    setPathRoute(route[1]);
  }, [location]);

  const tabHandleClick = (route: string) => {
    dispatch({
      type: RESET_STATE,
      payload: { state: route },
    });
    navigate(`/${route}`);
  };
  return (
    <Box className="customdrawer_mainContainer">
      <Grid container className="customdrawer_subContainer">
        <Grid item xs={2} className="customdrawer_gridConatiner">
          {configJSON.menuOptions.map((menu: menuProps) => (
            <Box
              className={`customdrawer_innerContainer ${
                pathRoute === menu.route
                  ? "customdrawer_activeTab"
                  : "customdrawer_notActiveTab"
              }`}
              key={menu.id}
              onClick={tabHandleClick.bind(this, menu.route)}
            >
              <Typography className="customdrawer_titleTxt">
                {menu.title}
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid item xs={10} className="customdrawer_subContainer">
          {props.children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomDrawer;
