import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import { RESET_STATE } from "../../Hooks/Saga/Constant";
import { useDispatch } from "react-redux";
import DehazeIcon from "@material-ui/icons/Dehaze";
import CustomMenu from "../CustomMenu/CustomMenu.web";
import "./CustomDrawer.web.css";

const configJSON = require("../../Constants/Dashboard");

interface menuProps {
  id: string;
  title: string;
  route: string;
  tabClick?: any;
}
const CustomDrawer = (props: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pathRoute, setPathRoute] = useState<string>("");
  const [isAllMenuOpen, setIsAllMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const route = location.pathname.split("/");
    setPathRoute(route[1]);
  }, [location]);

  const tabHandleClick = (route: string) => {
    dispatch({
      type: RESET_STATE,
      payload: { state: route },
    });
    setIsAllMenuOpen(!isAllMenuOpen);
    navigate(`/${route}`);
  };

  const allClickTabHandle = () => {
    setIsAllMenuOpen(!isAllMenuOpen);
  };

  const menuOptionView = (menu: menuProps) => {
    return (
      <Box>
        {menu.title === "All" ? (
          <Box
            className={`customdrawer_allTextContainer ${
              pathRoute === menu.route
                ? "customdrawer_activeTab"
                : "customdrawer_notActiveTab"
            }`}
            key={menu.id}
            onClick={allClickTabHandle}
          >
            <DehazeIcon
              className={`${
                pathRoute === menu.route
                  ? "customdrawer_allTextActiveIcon"
                  : "customdrawer_allTextInActiveIcon"
              }`}
            />
            <Typography className="customdrawer_titleTxt">
              {menu.title}
            </Typography>
          </Box>
        ) : (
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
        )}
      </Box>
    );
  };
  return (
    <Box>
      <CustomMenu
        open={isAllMenuOpen}
        handleClose={allClickTabHandle}
        tabChangeHandle={tabHandleClick}
      />
      <Grid container className="customdrawer_gridConatiner">
        {configJSON.rdAdminmenuOptions.map((menu: menuProps, index: number) => (
          <Grid item xs={6} sm={3} md={3} lg={2}>
            {index < 6 && (
              <Box className="customdrawer_largeGridContainer">
                {menuOptionView(menu)}
              </Box>
            )}
            {index < 4 && (
              <Box className="customdrawer_mediumGridContainer">
                {menuOptionView(menu)}
              </Box>
            )}
            {index < 2 && (
              <Box className="customdrawer_smallGridContainer">
                {menuOptionView(menu)}
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CustomDrawer;
